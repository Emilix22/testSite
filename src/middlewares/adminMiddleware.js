function adminMiddleware (req, res, next){
    if(req.session.userLogged && req.session.userLogged.level_id == 1){
        return next();
    }
        return res.redirect('/users/login')
};

module.exports = adminMiddleware;