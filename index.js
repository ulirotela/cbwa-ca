const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

const users = require('./controllers/users')();
const usersModel = require('./models/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')(); 

app.use(bodyParser.json());

//users routes
app.get('/users', users.getController);
app.get('/users/:email', users.getByEmail);
app.post('/users', users.postController);

app.get('/issues', issues.getController);
app.get('/issues/:issueNumber', issues.getByIssueNumber);
app.get('/projects/:projectSlug/issues', issues.getByProjectSlug);
app.post('/projects/:slugName/issues', issues.postController);
app.put('/projects/issues/:issueNumber/:status', issues.updateStatus);

app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getBySlug);
app.post('/projects', projects.postController);

app.get('/comments/:email', comments.getByAuthor);
app.get('/comments', comments.getAllComments);
app.get('/issues/:issueNumber/comments', comments.getAllCommentsIssue);
app.get('/issues/:issueNumber/comments/:commentId', comments.getComment);
app.post('/issues/:issueNumber/comments', comments.addComment);

app.get('/', (req, res) => {
  res.send('Hello Bug Tracker ');
});

app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});

app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: 'Route not found',
  });
});