var express = require('express')
var router = express.Router()
var connection = require('../controller/conncetion')

router.get('/product',connection.getproduct)
router.get('/brands',connection.getbrands)
router.get('/colgate',connection.getColgate)
router.get('/oral',connection.getTotal)
router.get('/ans',connection.getans)
router.get('/date',connection.getDate)
router.get('/or',connection.getor)
router.get('/and',connection.getand)
router.get('/nor',connection.getnor)

module.exports = router