const db = require('../database/models');
const Products = db.Product;

const controller = {

    product: (req, res) => {
		Products.findByPk(req.params.id)
            .then(product => {
                res.json(product);
            });
    },
}

module.exports = controller;