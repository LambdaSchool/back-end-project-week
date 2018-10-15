const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../user/User');
// const wala = require('../wala');
const bcrypt = require("bcrypt");


// const secret = wala.secret;

function generateToken(user) {
    const options = {
        expiresIn: '1h',
    };
    const payload = { name: user.username };  
    return jwt.sign(payload, process.env.REACT_APP_SECRET, options);
}

router.get('/', (req, res) => {
    User.find()
        .populate("notes", "-_id -__v -user")
        .select('-password')
        .then(users => {
            console.log("We here", users)
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
  
 User.findById({ _id: req.params.id })
.then(function(user) {
    console.log("Bahd!", user)
  res.status(200).json(user);
})
.catch(function(error){
  res.status(500).json(`{Error occured while getting a user by ID: ${error}}`)
  })
})
router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password ) {
        res.status(400).json({ error: "Please provide a username, password and email!" });
        return;
    }
    User.create(req.body)
        .then(({ username }) => {
            const token = generateToken({ username });
            res.status(201).json({ username, token });
        })
        .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username })
        .then(user => {
            if (user) {
                user.validatePassword(password)
                    .then(match => {
                        if (match) {                            
                            const { username, _id } = user;
                            const token = generateToken(user)
                            res.status(200).json({ 
                                message: `welcome ${username}!`,
                                username,
                                token, 
                                userId: _id 
                            })
                        } else {
                            res.status(401).json({ error: 'Invalid credentials, check your username and password!' })
                        }
                    })
                    .catch(err => {
                        res.status(500).json(`{ error: error processing information. error: ${err}}`)
                    })
            } else {
                res.status(401).json({ error: 'Invalid credentials, check your username and password!' })
            }
        })
        .catch(err => {
            res.status(500).json(`{message: something bahd! error: ${err}}`)
        })
})

router.put('/update/:id', (req, res) => {
    const { _id, username, email} = req.body;     
    User.findById({ _id: req.params.id })
      .then(function(user) {
          console.log("Back user", user)
        if (user) {
          (user.username = username), (user.email = email);
          User.findByIdAndUpdate({ _id: req.params.id }, user)
            .then(user => {
              response.status(200).json(user);
            })
            .catch(err => {
              res.status(500).json(`message: Error username or email: ${err}`);
            });
        }
      })
.catch(function(error){
  res.status(500).json(`{Put message: something bahd! error: ${error}}`)
  })
})

router.put('/resetpassword/:_id', (req, res) => {    
    const {_id, newPassword, verifyPassword, password} = req.body;  
    User.findById({ _id: req.params._id })
    .then(function(user) {
      if (user) {        
        if (bcrypt.compareSync(password, user.password)) {         
          if (newPassword === verifyPassword) {
            user.password = bcrypt.hashSync(newPassword, 11);
            User.findByIdAndUpdate({ _id: req.params._id }, user)
              .then(user => {              
                res.status(200).json(user);
              })
              .catch(err => {
                res.status(500).json(`message: Error reseting password: ${err}`);
              });
          }
        }
      }
    })
    .catch(function(error){
        res.status(500).json(`Reset message: something bahd! error: ${error}`)
        })
  })




module.exports = router;