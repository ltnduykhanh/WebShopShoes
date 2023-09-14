const express = require('express')
const router = express.Router()
const collectionController = require('../app/controllers/CollectionController')

router.get('/create', collectionController.create)
router.post('/store', collectionController.store)
router.get('/:id/edit', collectionController.edit)
router.put('/:id', collectionController.update)
router.delete('/:id', collectionController.delete)
router.patch('/:id/restore', collectionController.restore)
router.delete('/:id/force', collectionController.forceDelete);
router.get('/:slug', collectionController.show)




module.exports = router