const express = require('express')
const app = express()
const port = 3000

const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');

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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

