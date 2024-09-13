const express = require('express')
const Router = express.Router()

const { login, register } = require('../controllers/authController')

Router.post('/login', login)
Router.post('/register', register)

module.exports = Router