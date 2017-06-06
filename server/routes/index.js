var express =  require('express')
var router =  express.Router()
var controller =  require('../controllers/customers_controller')

router.post('/login',controller.login)
router.post('/signup',controller.signup)

module.exports = router;
