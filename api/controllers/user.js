const User = require('../models/UserModels');
const { letsMakeAToken} = require('../middleware/Auth-Middleware')

const createUser = (req, res) => {
  const { username, password } = req.body;

  User.create({ username, password })
    .then(({ username }) => {
      res.status(201).json({username })
    })
    .catch(err => {
      res.status(500).json({error: "error creating User", err: err.message})
    });
};

const login = (req, res) => {
  res.status(200).json({user: req.user, token: letsMakeAToken(req.user)})
}



module.exports = {
  createUser,
  login,
  
}