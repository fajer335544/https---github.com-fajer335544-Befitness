const crypto = require('crypto');

var await = require('await');
const User = require('../model/User');
const bcrypt = require('bcryptjs');


const nodemailer = require('nodemailer');

const sendgridTransport = require('nodemailer-sendgrid-transport');


let transporter = nodemailer.createTransport(sendgridTransport({


  auth: {

    api_key: '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'
  }
})
);



exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    //csrfToken: req.csrfToken() ,
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    //csrfToken: req.csrfToken() ,
    isAuthenticated: false
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  await User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {

        req.flash('error', 'Invalid email or password.');

        res.json({ error: req.flash('error') });


        //return res.status(404).send('Invalid email or password.');
      }

      bcrypt.compare(password, user.password)
        .then(doMatch => {


          if (doMatch) {

            req.session.isLoggedIn = true;
            req.session.user = user;
            
            return req.session.save(err => {
              console.log(err);

              req.flash('error', ' Your Login Done !!');

              res.json({ error: req.flash('error') });
              // res.status(200).send('log in .....');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.json({ error: req.flash('error') });
          //res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          req.flash('error', 'error message from server');
          res.json({ error: req.flash('error') });
          //res.redirect('/login');
        });
    })
    .catch(err => console.log(err));


};








exports.postSignup = async (req, res, next) => {
  const userLastName = req.body.userLastName;
  const userFirstName = req.body.userFirstName;
  const phone = req.body.phone;
  const Age = req.body.Age;
  const Gender = req.body.Gender;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  const confirmPassword = req.body.confirmPassword;
  

  await User.findOne({ where: { email: req.body.email } })
    .then(userDoc => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        res.json({ error: req.flash('error') });
        // return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {

          const user = new User({
            userLastName: userLastName,
            userFirstName: userFirstName,
            phone: phone,
            Age: Age,
            Gender: Gender,
            username: username,
            email: email,
            password: hashedPassword

          });
          return user.save();
        })
        .then(result => {
          // res.redirect('/login');
          req.flash('error', 'Welcome to Our Website');

          res.json({ error: req.flash('error') });
          return transporter.sendMail({
            to: email,
            from: 'fajer335544@hotmail.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          }).catch(err => {
            console.error(err);
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });

};

exports.postLogout = (req, res, next) => {
  console.log('hi ---------------------------------------------------------------------------------------');
  req.session.destroy(err => {
    console.log(err);


  });
  return res.redirect('/');
};




exports.getReset = (req, res, next) => {

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {

    path: '/reset',
    pageTitle: 'Rest Password',
    errorMessage: message,
    //csrfToken: req.csrfToken() ,
    isAuthenticated: false
  });
}


exports.PostReset = (req, res, next) => {




  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    await User.findOne({ where: { email: req.body.email } }).then(user => {
      if (!user) {
        req.flash('error', 'NO account with this email');
        res.json({ error: req.flash('error') });
        //  return res.redirect('/reset');
      }
      if (user) {
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 36;
        return user.save();
      }
    }).then(user => {

      // res.redirect('/');


      return transporter.sendMail({
        to: req.body.email,
        from: 'fajer335544@hotmail.com',
        subject: 'Password reset',
        html: `  
        <h1> Fitness GYM </h1>
        
        <p>you requested password reset</p>
<p> Click this <a href="http://localhost:3000/reset/${token} " >button</a>  to reset your password</p>  `


      });



    }).catch(err => {
      console.log(err);
    });
  })
}




exports.getNewPassword = (req, res, next) => {
  const token = req.params['token'];

  req.flash('token', token);
  User.findOne({ where: { resetToken: token, resetTokenExpiration: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        isAuthenticated: false
        // userId: user._id.toString()
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {

  const token1 = req.flash('token');
  //   res.send(token);
  const newPassword = req.body.password;

  const token = token1.slice(0, -1);

  return bcrypt.hash(newPassword, 12).then(hash => {

    User.update({ password: hash }, { where: { resetToken: token } })
      .then(
        res.redirect('/login')
      );
  });












};

