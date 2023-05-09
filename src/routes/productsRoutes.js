const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const adminMiddleware = require('../middlewares/adminMiddleware');
const productsController = require('../controllers/productsController');
const userLogs = require('../middlewares/userLogs');


//Todos los productos
router.get('/', productsController.index);

//Listar productos eliminados
router.get('/removed', adminMiddleware, productsController.removed);
//Recuperar producto eliminado
router.post('/restore/:id/', productsController.restore);

//buscar producto
router.post('/search', productsController.search);

 //crear productos
 router.get('/create', adminMiddleware, productsController.create); 
 router.post('/create', upload.single('image'), userLogs, productsController.store);

// //editar producto
router.get('/edit/:id/', adminMiddleware, productsController.edit); 
router.put('/edit/:id/', upload.single('image'), productsController.update); 

 //Detalle de producto
 router.get('/detail/:id/', productsController.productDetail);

 //Carrito de compras
 router.get('/productCart', productsController.productCart);

// //Eliminar producto
router.get('/delete/:id/', productsController.confirmDelete)
router.delete('/delete/:id/', adminMiddleware, productsController.destroy);

module.exports = router;