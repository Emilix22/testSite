const fs = require('fs');
const path = require('path');

function userLogs (req,res, next) {
    fs.appendFileSync(path.join(__dirname, '../logs/userCreateProduct.txt'), 'El usuario ' + res.locals.isLogged.email + ' creó el producto: ' + req.body.name +' en la fecha y hora: ' + Date() +'\n')
    
    next();
}

module.exports = userLogs;