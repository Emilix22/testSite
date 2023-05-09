const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const validations = require('../middlewares/validationsRegister');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const usersController = require('../controllers/usersController');


//Listado de usuarios
router.get('/', adminMiddleware, usersController.index);

//Formulario Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.processLogin);

//Formulario registro
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('image'), [validations], usersController.processRegister);

//Perfil de usuario
router.get('/profile/:id', authMiddleware, usersController.profile);

//Editar de usuario
router.get('/edit/:id/', usersController.edit)
router.put('/edit/:id/', upload.single('image'), usersController.processEdit)

//Modificar permisos de usuario
router.get('/level/:id/', adminMiddleware, usersController.level);
router.put('/level/:id/', usersController.processLevel);

//Eliminar usuario
router.get('/delete/:id/', usersController.confirmDelete)
router.delete('/delete/:id/', adminMiddleware, usersController.destroy);

//Cerrar sesión
router.get('/logout', usersController.logout);

module.exports = router;