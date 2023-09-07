const Collection = require('../models/collections')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const { render } = require('node-sass');

class MeController {

    // [POST] /me/stored/collections
    storedCollections(req, res, next) {
        Collection.find({})
        .then(collections => {
            res.render('me/stored-collections', {
                collections: mutipleMongooseToObject(collections)
            })
        })
        .catch(next);
        
    }

    trashCollections(req, res, next) {
        Collection.findWithDeleted({deleted: true,})
        .then(collections => res.render('me/trash-collections',{
            collections: mutipleMongooseToObject(collections)
        }))
        .catch(next)
        
    }
}   

module.exports = new MeController();
