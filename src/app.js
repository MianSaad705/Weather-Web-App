const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geoCode=require('./utils/geocode');
const foreCast=require('./utils/forecast');


const app=express();
const port=process.env.PORT || 3000

// setting paths for express config
const publicDirectryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials')

//setting express engines for hbs and customize view Path
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);


app.use(express.static(publicDirectryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'M.Saad Latif'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'M Saad Latif',
        message:'How may we help you?'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'M Saad Latif'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'M Saad Latif',
        errrorMsg:'Help Article not found'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Kindly provide Address'
        });
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            });
        }
            foreCast(latitude,longitude,(error,response)=>{
                if(error){
                    return res.send({
                        error
                    });
                }
                    res.send({
                       forecast:response,
                       location,
                       address:req.query.address
                   })  
                })          
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query);
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'M Saad Latif',
        errrorMsg:'Page Not Found!'
    });
})
app.listen(port,()=>{
    console.log('Server Started on Port '+port+'');
})
