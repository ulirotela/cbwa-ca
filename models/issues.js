const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;

const COLLECTION = 'issues';

module.exports = () => { 
  const get = async (issueNumber = null) => {
    if (!issueNumber) {
      const issues = await db.get(COLLECTION);
      return issues;
    }

    const issue  = await db.get(COLLECTION, {
      issueNumber: issueNumber,
    });
    return issue;
  };

  const getByProject = async (slug) => {
    PIPELINE = [
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'project_id',
          as: 'issues',
        },
      },
      { $match: { slug: RegExp(`^${slug}$`, 'i') } },
      {
        $project: {
          'issues.project_id': 0,
        },
      },
    ];

    const issueProject = await db.aggregate('projects', PIPELINE);

    return issueProject;
  };

  const add = async (slugName, title, description, status) => {
    const project = await db.get('projects', { slug: slugName });

    const { _id, slug } = project[0];
    const issuesCounter = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      issueNumber: `${slug}-${issuesCounter + 1}`,
      title: title,
      description: description,
      status: status,
      project_id: new ObjectID(_id),
      comments: [],
    });
    return results.result;
  };

  const status = async (issueNumber, status) => {
    const PIPELINE = [
      { issueNumber: issueNumber },
      { $set: { status: status } },
    ];
    const results = await db.update(COLLECTION, PIPELINE);
    return results.result;
  };

  return {
    get,
    add,
    getByProject,
    status,
  };
};
