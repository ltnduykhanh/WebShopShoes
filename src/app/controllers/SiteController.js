const Collection = require('../models/collections')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    // [GET] /
    index(req, res, next) {
        Collection.find({}).limit(3)
        .then(collections => {
            res.render('home', {
                collections: mutipleMongooseToObject(collections)
            })
        })
        .catch(error => next(error));
        // if(req.isAuthenticated()){
        //     Collection.find({}).limit(3)
        //     .then(collections => {
        //         res.render('home', {
        //             collections: mutipleMongooseToObject(collections)
        //         })
        //     })
        //     .catch(error => next(error));
        // }else{
        //     res.redirect('/')
        // }

        
    }

    showAllProduct(req, res, next) {
        Collection.find({})
        .then(collections => {
            res.render('allproduct', {
                collections: mutipleMongooseToObject(collections)
            })
        })
        .catch(error => next(error));
    }


    
    //[GET]/ contact
    contact(req, res) {
        res.render('contact');
    }
}

module.exports = new SiteController();
