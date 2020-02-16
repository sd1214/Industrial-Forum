// const express=require('express');
// const router=express.Router();
// const BlogPost=require('../models/BlogPost');
// const mongodb = require('mongodb');
// const MongoClient = 'mongodb.MongoClient';
// const url = `mongodb+srv://sd1214:database@firstcluster-ix5me.mongodb.net/test?retryWrites=true&w=majority`;


const router = require('express').Router();
let User = require('../models/BlogPost');

router.route('/').get((req, res) => {
     User.find()
      .then(postMsg => res.json(postMsg))
      .catch(err => res.status(400).json('Error: ' + err));
  });



  /////check this post req.



  router.route('/add').post((req, res) => {
    const title = req.body.title;
    const newItem = req.body.newItem;
    const date=new Date();
    const newData = new User({
       title,
       date,
       newItem
    });
     
     newData.save()
    .then(() => res.json('Data added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;