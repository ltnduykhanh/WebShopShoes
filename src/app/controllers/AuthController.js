const User = require('../models/users')
const {mutipleMongooseToObject} = require('../../util/mongoose');
class AuthController {


    // [GET] /register
    register(req, res) {
        res.render('authentication/register');
    }

    // [POST] /collection/store
    newUser(req, res, next) {
        const user = new User(req.body)
        user.save()
        .then(() => res.redirect('/'))
        .catch(error => {})
        
    }
    // [GET] /login
    login(req, res) {
        res.render('authentication/login')
        
    }

    async loginCheck(req, res){
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await User.findOne({ email });

            if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
            }

            if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
            }

            res.status(200).redirect('/home');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    show(req, res, next) {
        User.findById(req.params.id)
        .then(user => res.render('users/show', {
                user: mongooseToObject(user)
            }))
        .catch(next)
        
    }
}   

module.exports = new AuthController();
