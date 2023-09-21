const User = require('../models/users')
const {MongooseToObject} = require('../../util/mongoose');
// const md5 = require('md5')
// const bcrypt = require('bcrypt');
const passport = require('passport');
class AuthController {


    // [GET] authentication/register
    register(req, res) {
        res.render('authentication/register');
    }

    // [POST] /collection/store
    newUser(req, res) {
        // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        //     const user = new User({
        //         email: req.body.email,
        //         password: hash
        //     })
        //     user.save()
        //     .then(() => res.redirect('/'))
        //     .catch(error => {})
        // });

        User.register({username: req.body.email}, req.body.password, function(err, user){
                if(err) {
                    console.log(err);
                    res.redirect('/auth/register')
                }else{
                    passport.authenticate('local')(req,res,function(){
                        res.redirect('/auth/:id/show')
                    })   
                }
        })

        
    }
    // [GET] /login
    login(req, res) {
        res.render('authentication/login')
        
    }

    loginCheck(req,res){

        const user = new User({
            email : req.body.email,
            password : req.body.password
        })

        req.login(user, function(err){
            if(err){
                console.log(err);
            }
            else{
                passport.authenticate('local')(req,res, function(){
                    res.redirect('/auth/show')
                })
            }
        })
    }
    // async loginCheck(req, res){
    //     const email = req.body.email;
    //     const password = req.body.password;

    //     try {
    //         const user = await User.findOne({ email });

    //         if (!user) {
    //             res.json({ message: 'Invalid email or password' });
    //         }else{
    //             if (user) {
    //                 bcrypt.compare(password, user.password, function(err, result) {
    //                     if(result === true){
    //                         res.redirect('/home');
    //                     } 
    //                 });
    //             }   
    //         }
    //         res.json({ message: 'Invalid email or password' });

            
    //     } catch (error) {
    //         console.error(error);
    //         res.json({ message: 'Internal server error' });
    //     }
    // }

    show(req, res, next) {
    //     User.findById(req.params.id)
    //     .then(user => res.render('users/show', {
    //             user: mongooseToObject(user)
    //         }))
    //     .catch(next)

    //     if(req.isAuthenticated()){
    //         User.findById(req.params.id)
    //         .then(user => {
    //             res.render('users/show', {
    //                 User: MongooseToObject(user)
    //             })
    //         })
    //         .catch(error => next(error));
    //     }else{
    //         res.redirect('/auth/login')
    //     }

        if(req.isAuthenticated()){
            res.render('user/show')
        }else{
            res.redirect('/auth/login')
        }
    }
    
}   

module.exports = new AuthController();
