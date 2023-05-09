const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Otra forma de llamar a los modelos
const Products = db.Product;
const Category = db.Category;

const controller = {

    index: (req, res) => {
		Products.findAll()
            .then(products => {
                res.render('./products/products', {products: products})
            })
    },

    removed: (req, res) => {
        Products.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null
                  }
                },
            paranoid: false      
        })
            .then(products => {
                res.render('./products/products-removed', {products: products})
            })
    },

    restore: (req, res) => {
        Products.restore({
            where: {
                id: req.params.id
                },    
        })
            .then(product => {
                res.redirect('/products')
            })
    },

    productCart: (req, res) => {
        res.render('./products/productCart');
    },
    
    search: (req, res) => {
        
        if(req.body.search) {
            Products.findAll({
            where: {
                name: {
                    [Op.like]: '%'+req.body.search+'%'
                  }    
            }
        })
        .then(products => {
           
            if(products.length > 0){
                res.render('./products/products', {products: products});
                
            }else{
                res.send('Lo siento, no hemos encontrado su consulta..')
            }
            })
        }else{
            res.send('debe indicar el producto que quiere buscar..')
        }
        
        
        },

    productDetail: (req, res) => {
		Products.findByPk(req.params.id)
            .then(product => {
                res.render('./products/productDetail', {product});
            });
    },

    create: (req, res) => {
        Category.findAll()
            .then(categories => {
                res.render('./products/product-create-form', {categories})
            })
		// res.render('./products/product-create-form')	
 	},
    
	store: (req, res) => {
		let img

		if(req.file != undefined){
			img = req.file.filename
		} else {
			img = 'foto-logo.jpg'
		}

		Products.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            image: img,
            category_id: req.body.category,
            user_created: req.session.userLogged.email
        })
        .then(product => {
            res.redirect('/products')
        });

 	},

	edit: (req, res) => {
        Products.findByPk(req.params.id)
        .then(product => {
            res.render('./products/product-edit-form', {product: product})
        })
    },
   
    update: (req, res) => {
    let productToEdit  = Products.findByPk(req.params.id);

	   let img

		if(req.file != undefined){
			img = req.file.filename
		} else {
			img = productToEdit.image
		}

        Products.update(
            {
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description,
                image: img
            },
            {
                where: {id: req.params.id}
            }
        )
        .then(product => {
            res.redirect('/products');
        })
   },
   confirmDelete: (req, res) => {
    Products.findByPk(req.params.id)
    .then(product => {
        res.render('./products/productDelete', {product: product})
    }) 
   },
   destroy: (req, res) => {
    Products.destroy({
        where: {id: req.params.id}
    })
    .then(product => {
        res.redirect('/products');
    })
		
   }
};

module.exports = controller;