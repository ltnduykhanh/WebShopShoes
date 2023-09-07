const express = require('express')
const router = express.Router()
const meController = require('../app/controllers/MeController')

router.get('/stored/collections', meController.storedCollections)
router.get('/trash/collections', meController.trashCollections);

module.exports = router