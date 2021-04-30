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

app.use(function (req,res,next){
	res.status(404).render('404')
  console.log("404, page doesn't exist, check path")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

