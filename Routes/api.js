const express=require('express');
const router=express.Router();
const BlogPost=require('../models/BlogPost');

//Installing some Routes in our server
router.get('/api',(req,res)=>{
    BlogPost.find({})
        .then((data)=>{
            console.log('Data:', data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error',dataerror);
        });
});

router.post('/api/save',(req,res)=>{
    console.log('Body', req.body);
    const data=req.body;
    const newBlogPost= new BlogPost(data);
    newBlogPost.save((error)=>{
        if(error){
            res.status(500).json({msg:'Sorry,internal error'});
        }
        else{
            res.json({
                msg:'Your data has been saved'
            });
        }
});
});

// router.get('/api/name',(req,res)=>{
//     const data={
//         username: 'peterson',
//         age:5
//     };
//     res.json(data);
// });
router.get("/new",function(req,res){
    Item.findById(req.params.id,function(err,item){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{item:item});
        }
    });
});

router.post("/" ,function(req,res){
   BlogPost.findById(req.params.id,function(err,item){
        if(err){
            redirect("/");
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.text = req.body.text;
                    comment.save();
                    item.comments.push(comment);
                    item.save();
                    req.flash("success","Successfully added the comment");
                    res.redirect("/items/"+item._id);
                }
            });
        }
    });
});

// show all posts
router.get('/',function(req,res){

})

// save post in db
router.post('/newpost',function(req,res){
    BlogPost.create
})
// show post in new window
router.get('/showpost',function(req,res){})
// show new comment form
router.get('/newcomment',function(req,res){})
// post route to save comment in db
router.post('/newcomment',function(req,res){})
// form for new reply
router.get('/newreply',function(req,res){})
//post route to save reply in db
router.post('/newreply',function(req,res){})

module.exports = router;