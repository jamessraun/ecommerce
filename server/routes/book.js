var express =  require('express')
var router =  express.Router()
var controller =  require('../controllers/items_controller')

router.get('/',controller.getAllItems)
router.post('/new',controller.createItem)
router.post('/:id',controller.getItem)
router.get('/:name',controller.getItemByName)
router.put('/:id',controller.updateItem)
router.delete('/:id',controller.deleteItem)


module.exports = router;
