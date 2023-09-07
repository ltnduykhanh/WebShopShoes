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
    }

    // [GET] /login
    login(req, res) {
        res.render('login');
    }
}

module.exports = new SiteController();
