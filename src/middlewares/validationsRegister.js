const { body } = require('express-validator');

const validations = [
  body('name').notEmpty().withMessage('El campo nombre es obligatorio'),
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').isLength({ min: 8}).withMessage('El password debe tener 8 caracteres')
  ]

  module.exports =validations;