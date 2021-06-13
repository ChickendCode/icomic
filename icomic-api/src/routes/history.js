const express = require('express')
const create = require('../api/history/create')
const getOne = require('../api/history/getOne')
const auth = require('../middlewares/auth')
const update = require('../api/history/update')
const router = express.Router()

router.put('/:_id', auth, update)
router.get('/:_id', auth, getOne)
router.post('/register', create)
module.exports = router