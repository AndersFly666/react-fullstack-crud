const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./model/comments');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;

// database config
mongoose.connect('mongodb://admin:159357admin@ds033076.mlab.com:33076/react-fullstack');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set headers to allow CORS, to prevent errors from Cross Origin Resource Sharing,
app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  //remove cacheing
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Set up router configuration

router.get('/', (req, res) => {
  res.json({ message: 'App initialized' });
});

router.route('/comments')
  .get((req, res) => {
    Comment.find((err, comments) => {
      if (err) res.send(err);

      res.json(comments);
    });
  })
  .post((req, res) => {
    const comment = new Comment();
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(err => {
      if (err) res.send(err);

      res.json({ message: 'Comment was successfully added.' });
    })
  });

router.route('/comments/:comment_id')
  .put((req, res) => {
    const id = req.params.comment_id;

    Comment.findById(id, (err, comment) => {
      if(err) res.send(err);

      req.body.author ? comment.author = req.body.author : null;
      req.body.text ? comment.text = req.body.text : null;

      comment.save(err => {
        if (err) res.send(err);

        res.json({ message: 'Comment was successfully updated' });
      });
    });
  })
  .delete((req, res) => {
    const id = req.params.comment_id;

    Comment.remove({ _id: id }, (err, comment) => {
      if (err) res.send(err);
      res.json({ message: 'Comment was successfully deleted' });
    });
  });

app.use('/api', router);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`); 
});