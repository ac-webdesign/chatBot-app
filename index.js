const express = require('express')
const ejs = require('ejs')
const PORT = 3000

//create express app
const app = express();

//set ejs as my view engine 
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/layout')
})

app.get('/about', (req,res) => {
    res.render('pages/about')
})
app.get('/contact', (req,res) => {
    res.render('pages/contact')
})
app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`)
})