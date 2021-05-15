

const express = require('express')
const app = express()
const port = 3000
const router = require('./router/index');
const handlebars = require('express-handlebars');
const bcrypt = require('bcrypt')
const passport = require('passport')

const session = require('express-session')

const initializePassport = require('./passport-config');
const flash = require('express-flash');
initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.use('/profile', router);

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }))


app.use(passport.initialize())
app.use(passport.session())

app.engine('hbs', handlebars({
  layoutsDir: `${__dirname}/views/layouts`,
  extname: 'hbs'
}));

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.render('main', {layout: 'index'});
});

app.get('/profile', (req, res) => {
  res.render('profile', {layout: 'index'});
})

app.get('/register', (req, res) => {
  res.render('register', {layout: 'index'});
})

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.get('/login', (req, res) => {
  res.render('login', {layout: 'index'});
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

