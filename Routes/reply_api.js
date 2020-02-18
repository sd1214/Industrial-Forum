const router = require('express').Router();
let User = require('../models/replies');

router.route('/').get((req, res) => {
  User.find()
    .then(postreply => res.json(postreply))
    .catch(err => res.status(400).json('Error: ' + err));
});



/////check this post req.


router.route('/add').post((req, res) => {
  const parent_id=req.body.parent_id;    
  const title = req.body.title;
  const newItem = req.body.newItem;
  const date = new Date();
  const newData = new User({
    parent_id,
    title,
    date,
    newItem
  });

  newData.save()
    .then(() => res.json('Data added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;