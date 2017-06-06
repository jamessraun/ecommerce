var express =  require('express')
var router =  express.Router()
var controller =  require('../controllers/carts_controller')

router.get('/',controller.getAllCarts)
router.post('/',controller.createCart)
router.put('/:id',controller.updateCart)
router.delete('/:id',controller.deleteCart)


module.exports = router;
