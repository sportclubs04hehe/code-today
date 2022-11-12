const express = require('express')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const catNames = require('cat-names')
const app = express()

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(cookieParser())

app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }))

app.get('/greeting', (req, res) => {
  res.render('greeting', {
    message: 'Hello!',
    style: req.query.style,
    userid: req.cookies.userid,
    username: req.session.username
  })
})

app.get('/set-random-userid', (req, res) => {
    res.cookie('userid', (Math.random()*10000).toFixed(0))
    res.redirect('/greeting')
  })
  
  app.get('/set-random-username', (req, res) => {
    req.session.username = catNames.random()
    res.redirect('/greeting')
  })


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/greeting\n`))