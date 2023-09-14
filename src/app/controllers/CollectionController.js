const Collection = require('../models/collections')
const {mongooseToObject} = require('../../util/mongoose')

class CollectionController {
    // [GET] /collection/:slug
    show(req, res, next) {
        Collection.findOne({slug : req.params.slug})
        .then(collection => 
            res.render('collections/show', {
                collection: mongooseToObject(collection)
            })
        )
        .catch(next)
        
    }

    // [GET] /collection/create
    create(req, res, next) {
        res.render('collections/create')
        
    }

    // [GET] /collection/createCategory
    createCategory(req, res, next) {
        res.render('collections/createCategory')
        
    }

    // [POST] /collection/store
    store(req, res, next) {
        const collection = new Collection(req.body)
        collection.save()
        .then(() => res.redirect('/me/stored/collections'))
        .catch(error => {

        })
        
    }

    // [GET] /collection/:id/edit
    edit(req, res, next) {
        Collection.findById(req.params.id)
        .then(collection => res.render('collections/edit', {
                collection: mongooseToObject(collection)
            }))
        .catch(next)
        
    }

    // [PUT] /collection/:id
    update(req, res, next){
        Collection.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/collections'))
            .catch(next);
    }

    //[DELETE] /collections/:id
    delete(req, res, next){
        Collection.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[PATCH] /collections/:id/restore
    restore(req, res, next){
        Collection.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }


    forceDelete(req, res, next){
        Collection.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
}

module.exports = new CollectionController();
