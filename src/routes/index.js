const siteRouter = require('./site')
const meRouter = require('./me')
const collectionsRouter = require('./collections')
const authRouter = require('./auth')

function route(app) {

    //me
    app.use('/me', meRouter)
    //collections
    app.use('/collections', collectionsRouter)
    
    //Home screen
    app.use('/home', siteRouter)
    //authentication
    app.use('/', authRouter)
    
}

module.exports = route;