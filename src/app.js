const path = require('path');
const express = require('express');
const gecode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express()

//define path for express config
const publicDirPath = path.join(__dirname, '../public')  //change directory
const viewPath = path.join(__dirname, '../templates/views')

//setup handlebar engine and view location =>  npm install hbs
app.set('view engine', 'hbs')
app.set('views', viewPath);

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Ankitsinh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ankitsinh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ankitsinh',
        message: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    else {
        gecode(req.query.address, (error, data) => {
            if (error) {
                res.send({ error })
            }
            else {
                forecast(data.latitude, data.longitude, (error, forecastData) => {
                    if (error) {
                        res.send({ error });
                    }
                    else {
                        res.send({
                            forecast: forecastData,
                            location: data.location,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    else {
        console.log(req.query.search);
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: "Artical not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('server running !');
})


// console.log(__dirname);  //current directory path
// console.log(__filename); //current file path
// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Ankit',
//             age: 22
//         },
//         {
//             name: 'Nil',
//             age: 28
//         }
//     ])
// })