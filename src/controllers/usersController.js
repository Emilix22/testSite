const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Users = db.User;
const Level = db.Level;


const controller = {

    index: (req, res) => {

        Users.findAll()
            .then(users => {
                res.render('./users/users', {users: users})
            })

    },  

    login: (req, res) => {
        res.render('./users/login', { errors: []});
    },

    processLogin: (req, res) => {
          
        Users.findOne({
            where: {email: req.body.email},
            include: [{association: 'level'}]
        })
        .then(userToLogin => {
            
            if(userToLogin){

            if (bcrypt.compareSync(req.body.password, userToLogin.password)){
                
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                
                
                if(req.body.rememberUser){
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
                }
                return res.redirect('/')
            }
            return res.render('./users/login', {errors: {email: {msg: 'Las credenciales son inválidas'}}, oldData: req.body})
        }
            return res.render('./users/login', {errors: {email: {msg: 'El email no es correcto'}}})
        }) 
    },

    register: (req, res) => {
        res.render('./users/user-register-form');
    },

    processRegister: (req, res) => {
        //Validaciones
        const errors = validationResult(req);
        
        if(errors.errors.length > 0){

            res.render('./users/user-register-form', { errors: errors.mapped(), oldData: req.body});
        }else{
            //Reviso que no este registrado usuario con ese mail
            Users.findOne({
                where: {email: req.body.email}
            })
            .then(userInDB => {
               if(userInDB){
                return res.render('./users/user-register-form', { errors: { email: { msg: 'Este email ya está registrado'}}, oldData: req.body});
            }
            //Defino img, la que suben o por defecto
            let img

            if(req.file != undefined){
                img = req.file.filename
            } else {
                img = 'foto-perfil-generica.png'
            }
            Users.create({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                level_id: 2,
                image: img
            })
            .then(res.redirect('/users/login'))
            })
   
        }   
    },

    profile: (req, res) => {
        Users.findByPk(req.params.id)
        .then(user => {
            res.render('./users/profile', { user: user})
        })
    },

    edit: (req, res) => {
        Users.findByPk(req.params.id)
        .then(user => {
            res.render('./users/user-edit-form', { user: user})
        })
    },

    processEdit: (req, res) => {
        let userToEdit  = Users.findByPk(req.params.id);            
        let img
		if(req.file != undefined){
			img = req.file.filename
		} else {
			img = userToEdit.image
		}

        Users.update(
            {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                image: img
            },
            {
                where: {id: req.params.id},
            }
        )
        .then(result => {
            Users.findOne({
                where: {id: req.params.id},
                include: [{association: 'level'}]
            })
            .then(userEdited => {
                req.session.userEdit = userEdited.dataValues
                
                res.redirect('/');
            })
            
        })
    },

    level: (req, res) => {
        Users.findOne({
            where: {id: req.params.id},
            include: [{association: 'level'}]
        })
        .then(user => {
            res.render('./users/user-level-form', { user: user})
        })
    },

    processLevel: (req, res) => {
        
        Users.update(
            {
                level_id: req.body.level,
            },
            {
                where: {id: req.params.id},
                // include: [{association: 'level'}]
            }
        )
        .then(user => {
            res.redirect('/');
        })
    },

    confirmDelete: (req, res) => {
        Users.findByPk(req.params.id)
        .then(user => {
            res.render('./users/userDelete', {user: user})
        }) 
       },
       destroy: (req, res) => {
        Users.destroy({
            where: {id: req.params.id}
        })
        .then(user => {
            res.redirect('/users');
        })
            
       },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');      
    }
}

module.exports = controller;