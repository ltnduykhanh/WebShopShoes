const express = require('express') // khai báo thư viện express
const path = require('path')// khai báo thư viện path
const hanlderbars = require('express-handlebars') //Khai báo thư viện của handlerbars
const morgan = require('morgan') // khai báo thư viện morgan
const methodOverride = require('method-override') // .....method-override
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../src/app/models/users')


//session and passport
app.use(session({
  secret:"Our little secrect",
  resave:false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
//Connect db
db.connect();

//Passport
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'

}, 
(email, password, done) => {  
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.verifyPassword(password)) { return done(null, false); }
    return done(null, user);
  });
}
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
//HTTP logger
// app.use(morgan('combined'))

//static file
app.use(express.static(path.join(__dirname, 'public')))

//middleware xử lý gửi dữ liệu
app.use(express.urlencoded({
  extended: true,
}))
app.use(express.json())


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// template engine

app.engine('hbs', hanlderbars.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    sum: (a, b) => a + b,
  }
}));
app.set('view engine', 'hbs'); // set cho view engine của project sử dụng hanlderbars
app.set('views', path.join(__dirname, 'resources/views'))

//Direct
//Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})