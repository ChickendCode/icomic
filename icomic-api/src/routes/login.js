const express = require('express')
const router = express.Router()
const login = require('../api/sign/login')
const socialNetworkLogin = require('../api/sign/socialNetworkLogin')

router.post('/', login)
router.post('/socialnetwork', socialNetworkLogin)


module.exports = router