const express = require('express')
const app = express()
const formidable = require("formidable")
const {getAllItems, addProduct, findItems} = require('./db-access/userdao')
require('dotenv').config()

//view enginge 
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

//Routing
app.get('/', (req, res) => {
   getAllItems() // line 6 deconstruction,weil export als Objekt
        .then((shopItems) => {
            res.render('pages/home', { shopItems })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/addItem', (req, res) => {
    res.render('pages/addProduct')
})

app.get('/sale',(req,res) => {
    findItems()
    .then((shopItems) => {
        console.log('Sale', shopItems)
        res.render('pages/salepage', {shopItems
        })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post('/addItem', (req, res) => {
    const form = formidable({ multiples: false })
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        } else {
            let product = {
                ProductName: fields.ProductName,
                ProductLink: fields.ProductLink,
                Price: fields.Price,
                Company: fields.Company,
                Image: fields.ProductPic
            }
            console.log(product)
            res.redirect('/')
        }
    })
})

app.use((_, res) => {
    res.sendStatus(404) // not found & end
})

const PORT = 3001
app.listen(PORT, () => console.log('Listening on Port:', PORT))