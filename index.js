const express = require('express');
const path = require('path');
const apiRoutes = require('./routers/index')

const app = express();
const PORT = process.env.PORT || 8080;

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());

//ROUTES
app.use('/api', apiRoutes);

const myserver = app.listen(PORT, () => {
    console.log("SERIVDOR ACTIVO EN EL PUERTO 8080");
});

myserver.on('error', error => {
    console.log('Error :', error);
});