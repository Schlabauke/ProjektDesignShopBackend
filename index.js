const express = require('express')
const app = express()
const formidable = require("formidable")
const { getAllItems } = require('./functionality/getAllItems')

app.set('view engine', 'ejs')

//Routing
app.get('/', (req, res) => {
    getAllItems() // line 6 decosntruction,weil export als Objekt
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
            res.render('/')
        }
    })
})




const PORT = 3141
app.listen(PORT, () => console.log('Listening on Port:', PORT))