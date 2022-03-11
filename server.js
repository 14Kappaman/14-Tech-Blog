const express = require("express")
const session = require('express-session');
const morgan = require('morgan')

require("dotenv").config()
const exphbs = require("express-handlebars")
const controller = require("./controller")
const port = process.env.PORT || 3000;
const app = express();
app. use(morgan("short"))
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

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));

app.use(controller);

app.listen(port, () => {
    console.log("Server is running. Please visit http://localhost:" + port + 
     " to view in development");
     sequelize.sync({ force: false });
})
//test
