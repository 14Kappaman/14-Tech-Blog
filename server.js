const express = require("express")
require("dotenv").config()
const {engine} = require("express-handlebars")

const port = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './view');
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

})
