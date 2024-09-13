const express = require('express')
const app = express()

const path = require('path')

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/assets', express.static('assets'))


// Database Connection
const db = require('./auth/dbConnect')
db.connect(e => !e ? console.log('dbConnected...') : console.log('Error in dbConnect...'))


// Cors
const cors = require('cors')

// const whiteList = ['https://games.shre.in', 'https://www.games.shre.in', 'http://eleca.shre.in', '', undefined]
const whiteList = ['http://localhost:5173', undefined]

const corsOption = {
    origin: (origin, cb) => {
        if(whiteList.indexOf(origin) !== -1) {
            cb(null, true)
        } else {
            cb('Not allowed : ' + origin)
        }
    }
}

app.use(cors(corsOption))

// Routes
app.use('/', require('./routes/basicRoute'))
app.use('/auth', require('./routes/authRoute'))


// Not Found Error
app.post('*', (req, res) => {
    return res.status(404).json({
        msg: 'Route not found!'
    })
})

app.listen(5000, () => console.log("Server running...."))