//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require(`lodash`);


const homeStartingContent = "A Platform to Read many storys and Write your own storys for the entire world to see ,Write a story about someone who overthinks every single thing, blowing the tiniest incidents out of proportion or Write a story about someone who thinks their life is a romcom and they’re the protagonist or Write about someone who has long since quit but decides to go another round for old time’s sake. write to you hearts content and inspire others while you are on it using this platform ";


const allPost=[] 

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {

  res.render(`home`,{
    homeStartingContent:homeStartingContent,
    allPost:allPost
  })
  
})

app.get('/about', (req, res) => {

  res.render(`about`)
  
})  

 

app.get('/compose', (req, res) => {

  res.render(`compose`)

})  

//express routing parameters
app.get('/story/:post', (req, res) => {
  
  allPost.forEach(post => {

    let postTitle = _.lowerCase(post.title)
    let postBody= post.body
    let truncateBody=postBody.substring(0,100)
    let postRoute=  _.lowerCase(req.params.post) 
    
    
    console.log(postTitle);
    
    if (postRoute===postTitle) { 
      res.render(`post`,{
        postTitle:postTitle,
        postBody:postBody,
        
      })
    }
    
    
  });
})

app.post('/', function (req, res) {

  const compose={
    title:req.body.postTitle,
    body:req.body.postBody,
    
  }

  allPost.push(compose)
  res.redirect(`/`)
    
})



app.listen(process.env.PORT || 3000,() => console.log(`server started in local host 3000`))