const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const path = require('path')
const ejs = require('ejs');
const dbconnect = require('./Configure/Dbconnection')
const User = require('./Model/userschema')
const bcrypt = require('bcryptjs')
app.use(express.json())
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
dbconnect.Dbconnect()
app.get('/', function (req, res) {
  res.render('index')
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  console.log(req.body);
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
      username, email, password: hashedPassword
    })
  } catch (error) {
    console.log(error);
  }
  res.json({
    status: "success"
  })
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    let userFound = await User.findOne({ email });
    if (userFound) {
      const passwordValid = await bcrypt.compare(password, userFound.password)
      console.log(userFound.password);
      console.log(password);

      if (!passwordValid) {
        res.json({
          status: "invalid password"
        })

      }
      else {
        res.json({ status: "success" })
      }
    }
  } catch (error) {
    console.log(error);
  }


})

app.listen(3000, () => {
  console.log('server connected');
})

