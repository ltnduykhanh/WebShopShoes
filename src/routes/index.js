const siteRouter = require('./site')
const meRouter = require('./me')
const collectionsRouter = require('./collections')
const authRouter = require('./auth')

function route(app) {
    
    //me
    app.use('/me', meRouter)
    //collections
    app.use('/collections', collectionsRouter)
    //authentication
    app.use('/auth', authRouter)
    //Home screen
    app.use('/', siteRouter)

    
}

module.exports = route;