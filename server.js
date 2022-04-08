const mongoose=require('mongoose');
const express=require('express');
const app=express();
const bcrypt=require('bcrypt');
const Detail=require('./models/authenticate');
// const token_Blog=require('./models/token');
// const jwt=require('jsonwebtoken');
// const JWT_SECRET='';
const dburi="mongodb+srv://sid:xyz4@nodetuts.4m0hh.mongodb.net/nodetuts?retryWrites=true&w=majority"




mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000)})
  .catch(err => console.log(err));

app.use(express.urlencoded({extended: false}));

app.set('view-engine','ejs');

app.get('/',(req,res)=>{
    res.redirect('/login')
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/register',(req,res)=>{
    res.render('register.ejs')
})

app.get('/index',(req,res)=>{
    res.render('index.ejs');
})

app.post('/register',async (req,res)=>{
   

        const hashPassword=await bcrypt.hash(req.body.password,10);
        const detail=new Detail({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        detail.save()
        .then((result)=>{
            res.redirect('/login')
        })
        .catch((err)=>{
            if(err.code==11000){
                // return res.json({ status: 'error',error: 'Username already in use'})
             
            res.render('404.ejs', {data:'Username already in use'});

            }
            else{
                throw error
            }
        })
        })

app.post('/login',async(req,res)=>{
    const{ name,password }=req.body;
    const user=await Detail.findOne({ name }).lean()
    if( !user){
        res.render('404.ejs', {data: 'Invalid username/password'});
    }
    if(bcrypt.compare(password,user.password)){

        // const token=jwt.sign({
        //     username: user.name,
        //     password: user.password
        // },JWT_SECRET);
        res.render('index.ejs');
      
    }
    res.render('404.ejs', {data: 'Invalid username/password'});
})

// function authenticateToken(req,res,next){
//     const authHeader= req.headers['authorization'];
//     const token= authHeader && authHeader.split(' ')[1];
//     if(token==null) res.render('404.ejs', {data: 'Token not found'});

//     jwt.verify(token,JWT_SECRET,(err,user)=>{

//     })
// }   
