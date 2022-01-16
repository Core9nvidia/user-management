const express=require('express');
const mongoose=require('mongoose');
const app=express();
const User=require('./models/userModel');

const url="mongodb+srv://roha:roha@nodetut.hijdw.mongodb.net/myDB?retryWrites=true&w=majority";
mongoose.connect(url)
    .then((result)=>app.listen(3000))
    .catch(err=>console.log(err));


app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    User.find()
        .then((result)=>{
            res.render('home',{title:'User Managment',users:result});
        })
        .catch((err)=>console.log(err));
    
});
app.get('/add-user',(req,res)=>{
    res.render('add-user',{title:'Add User'});
});

app.post('/add-user',(req,res)=>{
    console.log(req.body);
    const newuser=new User(req.body);
    newuser.save()
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>console.log(err));
});

app.get('/update-user/:id',(req,res)=>{
    const id=req.params.id;
    console.log("update -user req made ");
    User.findById(id)
        .then((result)=>{
            res.render('update-user',{user:result,title:'Update User'});
        })
        .catch((err)=>console.log(err));
});

app.post('/update-user/:id',(req,res)=>{
    const id=req.params.id;
    console.log("update -user ",req.body);
    User.findByIdAndUpdate(id,req.body)
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>console.log(err));
});

app.delete('/delete-user/:id',(req,res)=>{
    const id=req.params.id;
    console.log("update -user ",req.body);
    User.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect:'/'});
        })
        .catch((err)=>console.log(err));
});

app.use((req,res)=>{
    res.render('404',{title:'Error'});
})