const User = require('../models/user');

module.exports = (router) => {

router.post('/register', (req, res) => {

  if (!req.body.email) {
    res.send('YOU MUST PROVIDE AN EMAIL')
  }
  else if (!req.body.username) {
      res.send('YOU MUST PROVIDE A VALID USERNAME')
  }
  else if (!req.body.password) {
    res.send('YOU MUST PROVIDE A PASSWORD')
  }
  else {

      let user = new User({
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: req.body.password
      });

      user.save((err) => {
        if (err) {
          console.log(err)

            if (err.code === 11000) {
              res.send('Username or e-mail already exists')
            }
            else if (err.errors) {
              if (err.errors.email) {
                res.send(err.errors.email.message)
              }
              else if (err.errors.username) {
                res.send(err.errors.username.message)
              }
              else if (err.errors.password) {
                res.send(err.errors.password.message)
              }
            }
            else {
              res.send('Could not save user')
            }

        } else {
          res.send(req.body)
        }
      });

    }

  })

  return router;

};
