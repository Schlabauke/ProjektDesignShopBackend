const express = require('express')
const app = express()
const formidable = require("formidable")
const { getAllItems } = require('./functionality/getAllItems')
const { loginUser } = require('./services/loginuser')
const { registerUser }
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



app.post('/user/login', (req, res) => {
    const email = req.body.email
    const password = reg.body.password

    loginUser({ email, password })
        .then((token) => {
            res.send({ token })
        })
        .catch((err) => {
            console.log('err on login', err)
            res.status(400).send({ err: err.message }) // bad request, irgendwa stimmt mit der Clientanfrage nicht
        })
})

app.post('/user/register', (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password

    registerUser({ firstname, lastname, email, password })
        .then(() => {
            res.sendStatus(201)// heißt 'created',erfolgreich registriert
        })
        .catch((err) => {
            console.log('err on register:', err)
            res.status(400).send({ err: err.message })
        })
})

app.use((_, res) => {
    res.sendStatus(404) // not found & end
})

const PORT = 3141
app.listen(PORT, () => console.log('Listening on Port:', PORT))