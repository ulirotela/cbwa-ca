const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
            
  const getAllCommentsIssu = async (issueNumber) => {
    const PIPELINE = [
      { $match: { issueNumber: RegExp(`^${issueNumber}$`, 'i') } },
      {
        $project: {
          comments: 1,
          _id: 0,
          issueNumber: 1,
        },
      },
    ];

    const getCommentsIssue = await db.aggregate(COLLECTION, PIPELINE);
    return getCommentsIssue;
  };
  
  const getComment = async (commentId) => {
    var PIPELINE = [
      { $match: { 'comments._id': ObjectID(commentId) } },
      {
        $project: {
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: { $eq: ['$$comment._id', ObjectID(commentId)] },
            },
          },
          _id: 0,
          issueNumber: 1,
        },
      },
    ];
    const comment = await db.aggregate(COLLECTION, PIPELINE);
    return comment;
  };

  const add = async (issueNumber, text, author) => {
    console.log(author, issueNumber, text)
    const PIPELINE = { issueNumber: RegExp(`^${issueNumber}$`, 'i') };
    const CONDITION = {
      $push: {
        comments: {
          _id: new ObjectID(),
          text: text,
          author: author,
        },
      },
    };
    const results = await db.update(COLLECTION, PIPELINE, CONDITION);
    return results.result;
  };

  const getAll = async () => {
    const PIPELINE = [
      {
        $project: {
          _id: 0,
          issueNumber: 1,
          comments: 1,
        },
      },
    ];
    const allComments = await db.aggregate(COLLECTION, PIPELINE);

    return allComments;
  };


  //Get all comments for author
  const getByTheAuthor = async (email) => {
    const PIPELINE = [
      { $match: { 'comments.author': RegExp(`^${email}$`, 'i') } },
      {
        $project: {
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: { $eq: ['$$comment.author', RegExp(`^${email}$`, 'i')] },
            },
          },
          _id: 1,
          issueNumber: 1,
        },
      },
    ];
    const getByTheAuthor = await db.aggregate(COLLECTION, PIPELINE);
    return getByTheAuthor;
  };

  return {
    getAllCommentsIssu,
    add,
    getComment,
    getAll,
    getByTheAuthor,
  };
};