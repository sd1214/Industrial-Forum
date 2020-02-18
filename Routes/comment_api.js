const router = require('express').Router();
let User = require('../models/comments');
let user = require('../models/BlogPost');
router.route('/').get((req, res) => {
  User.find()
    .then(postcomment => res.json(postcomment))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/getItem').get((req,res)=>{
    user.find({_id : req.query.id})
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err))
})


/////check this post req.


router.route('/add').post((req, res) => {
  const parent_id=req.body.parent_id;    
  const comment_by = req.body.comment_by;
  const newItem = req.body.newItem;
  const replied_to = req.body.replied_to;
  const n_date = new Date();
  const newData = new User({
    parent_id,
    comment_by,
    newItem,
    n_date,
    replied_to
  });

  newData.save()
    .then(() => res.json('Data added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;