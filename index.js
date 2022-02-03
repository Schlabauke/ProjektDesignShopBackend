const express = require('express')
const app = express()
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

const PORT = 3141
app.listen(PORT, () => console.log('Listening on Port:', PORT))