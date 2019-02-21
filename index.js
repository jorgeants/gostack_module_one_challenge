const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const checkAgeParamMiddleware = (req, res, next) => {
  const age = req.query.age

  return age !== undefined && age !== '' ? next() : res.redirect('/')
}

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  res.render('user_age')
})

app.post('/check', (req, res) => {
  const age = req.body.age

  if (age && age >= 18) {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', checkAgeParamMiddleware, (req, res) => {
  const age = req.query.age
  res.render('major', { age })
})

app.get('/minor', checkAgeParamMiddleware, (req, res) => {
  const age = req.query.age
  res.render('minor', { age })
})

app.listen(3000)
