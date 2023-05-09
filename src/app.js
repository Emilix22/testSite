const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const userLogged = require('./middlewares/userLogged');


const indexRoutes = require('./routes/indexRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const rickApiRoutes = require('./routes/rickApiRoutes');
const apiRoutes = require('./routes/apiRoutes');


app.set('view engine', 'ejs');//si la carpeta views esta en la carpeta raiz, con esto ya esta.
app.set('views', './src/views');// esto es para marcarle que la carpeta views esta en la carpeta src.

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'Esto es secreto!!',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(userLogged);




app.use(express.static("public"));

app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/rickApi', rickApiRoutes);
app.use('/api', apiRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor corriendo en puerto', port);
});




