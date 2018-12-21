const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engin','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('sreamit',(text)=>{
    return text.toUpperCase();
});
app.use((req,res,next)=>{
    var now = new Date().toString();
    //console.log();
    var log = `${now}:${req.method},${req.url}`;
    next();
    fs.appendFile('sever.log',log+'\n',(err)=>{
        if(err){
            console.log('fs is wrong');
        }
    });
});

app.use((req,res,next)=>{
    res.render('maintenain.hbs'); // only this page would show up because no next()
});

// static website only need this and the last two. 
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
    res.render('index.hbs',{
        pageTitle:'Home Page'
        //currentyear:new Date().getFullYear()
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
        //currentyear:new Date().getFullYear()
    });
});

app.get('/bad/gg ',(req,res)=>{
    res.send({
        errorMessage:'error message'
    });
});

app.listen('3000',()=>{
    console.log('server is running');
});


