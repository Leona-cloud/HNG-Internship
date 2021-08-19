const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Joi = require('joi');


dotenv.config();

const app = express();
app.use(express.static('Routes'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(process.env.DB_CONNECT, 
{useNewUrlParser: true,
    useUnifiedTopology: true});

var db = mongoose.connection;

const regSchema = new mongoose.Schema({
    name: { type : String, required: true},
    email:  {type : String, required: true},
    subject: {type : String, required: true},
    messages: {type: String, required: true},
    
});
const User = mongoose.model('User', regSchema);

db.once('open', ()=> console.log('connected to the database'));
   
app.post('/sign_up', async(req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        messages: req.body.messages
       
    });
    

   
  try{
      const result = await user.save();
     return res.send('Thanks for your response')
      console.log(result)
  }
catch (ex) {
    res.send('Error');
    console.log(ex.message);
};
  
});




app.get('/', (req, res)=>{
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect('form.html');
}).listen(process.env.PORT || 5000);

console.log("connected to the server");
