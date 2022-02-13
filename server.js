const express = require("express")
const session = require('express-session');
require("dotenv").config()
const exphbs = require("express-handlebars")

const port = process.env.PORT || 3000;
const app = express();
const sequelize = require ("./config/connection")
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//app.set('views', './view');

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.listen(port, () => {
    console.log("Server is running. Please visit http://localhost:" + port + 
     " to view in development");
     sequelize.sync({ force: false });
})
