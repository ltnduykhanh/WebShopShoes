const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')


router.get('/', authController.login)
router.post('/login', authController.loginCheck)
router.get('/register', authController.register)
router.post('/register', authController.newUser)
router.get('/:id/show', authController.show)

module.exports = router