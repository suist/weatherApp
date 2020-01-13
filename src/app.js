const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

//Define paths for Expresss config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs') // handle bar  npm i hbs setup
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)       //header regiester


//setup static dictory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'suist'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'what Can I do for you?',
        name:'suist!!!!'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errormessage:'Help not found'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about..',
        name: 'suist susu '
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:' You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


        // const address= req.query.address


        // res.send({
        //     location:
        // })
    }
)

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        errormessage:"Page not found"
    
    })
})



//app.com
//app.com/help

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})