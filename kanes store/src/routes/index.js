const siteRouter = require('./site')
const meRouter = require('./me')
const collectionsRouter = require('./collections')

function route(app) {

    //me
    app.use('/me', meRouter)
    //collections
    app.use('/collections', collectionsRouter)
    //Home screen
    app.use('/', siteRouter)
    
}

module.exports = route;