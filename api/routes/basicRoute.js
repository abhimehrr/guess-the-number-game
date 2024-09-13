const express = require('express')
const Router = express.Router()

const { getTopUsers, getUser, updateScore } = require('../controllers/basicController')

Router.post('/get-top-users', getTopUsers)
Router.post('/get-user', getUser)
Router.post('/update-score', updateScore)


module.exports = Router