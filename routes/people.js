const User = require('../model/user');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello from people!')
});

router.post('/user',(req,res)=>{
  const user = req.body;
 const newUser = new User(user);
 newUser.save().then(data =>{
  if(data){
    res.status(200).json(data)
  }else{
    res.status(400).json({message:"Error saving user"});
  }
 })
 
})
module.exports = router;
