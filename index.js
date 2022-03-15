const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getAllItems, addProduct, findItems } = require('./db-access/userdao');
require('dotenv').config();

//view enginge
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//Routing
app.get('/', (req, res) => {
    getAllItems() // line 6 deconstruction,weil export als Objekt
        .then((shopItems) => {
            res.render('pages/home', { shopItems });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/addItem', (req, res) => {
    res.render('pages/addProduct');
});

app.get('/sale', (req, res) => {
    findItems()
        .then((shopItems) => {
            res.render('pages/salepage', { shopItems });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/addItem', (req, res) => {
    const newProduct = req.body;
    addProduct(newProduct)
        .then(() => {
            console.log('Product added');
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use((_, res) => {
    res.sendStatus(404); // not found & end
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening on Port:', PORT));
