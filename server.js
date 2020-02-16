//import npm Port
const express =require('express');
const mongoose =require('mongoose');
const morgan =require('morgan');
const path =require('path');
const bodyParser = require('body-parser');
const coreRouter = require('./Routes/signup_login')
const forumRouter= require('./Routes/post_api')
const app=express();
const PORT=process.env.PORT||8000;
const routes=require('./Routes/api');

//Database connection from mongodb atlas
const Mongodb_Uri='mongodb+srv://sd1214:database@firstcluster-ix5me.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(Mongodb_Uri || 'mongobd://localhost/my_database',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected!!!');
});

//these make them(either it be json or url) available to the request

app.use(express.json()); //middle word parse every json
app.use(express.urlencoded({extended:false})); //parse every url
app.use('/',coreRouter);
app.use('/forum',forumRouter);

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api',routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

