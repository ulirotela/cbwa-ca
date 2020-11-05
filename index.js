const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const app = (module.exports = express());

const users = require('./controllers/users')();

const hash = require('./models/users')();
const projects = require('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')(); 
  
app.use(async (req, res, next) => {
  const FailedAuthMessage = {
    error: 'Failed Authentication',
    message: 'Not authorized',
    code: 'xxx',
  };

  const key = req.headers['x-api-key'];
  const email = req.headers['x-api-user'];

  if (!key || !email) {
    FailedAuthMessage.code = '01';
    FailedAuthMessage.message = 'key or email not found';
    return res.status(401).json(FailedAuthMessage);
  }

  const user = await hash.getByKey(email, key);

  if (user.error) {
    FailedAuthMessage.code = '2';
    FailedAuthMessage.message = 'Email or password wrong';
    return res.status(401).json(FailedAuthMessage);
  }

  next();
});


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

app.get('/comments/:email', comments.getByAuthor);
app.get('/comments', comments.getAllComments);
app.get('/issues/:issueNumber/comments', comments.getAllCommentsIssue);
app.get('/issues/:issueNumber/comments/:commentId', comments.getComment);
app.post('/issues/:issueNumber/comments', comments.addComment);

app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getBySlug);
app.post('/projects', projects.postController);



app.get('/', (req, res) => {
  res.send('  asdfjk ');
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