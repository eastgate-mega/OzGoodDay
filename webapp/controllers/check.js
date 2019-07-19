'use strict';

class check{
    constructor(){

    }

    async isAdmin(req, res, next){
        if(req.session.passport){
            if(req.session.passport.user === 'test1'){
                return next();
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    }
     
    async isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            
            return next();
        }
        res.redirect("/login");
    }

}

module.exports = new check();