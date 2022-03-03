const express = require('express');
const { ProductsAPI, MessageAPI } = require('./models/index');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 8080;

//INSTACIAR SERVIDOR SOCKET Y API===============================/
const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

const Products = new ProductsAPI();
const Messages = new MessageAPI('messages.json');

//MIDDLEWARES===================================================/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

//SOCKET CONFIGURATION==========================================/
io.on('connection', async socket => {
    console.log('USUARIO CONECTADO');
    
    //carga de productos
    socket.emit('products', Products.getAll());

    //creacion de nuevo producto
    socket.on('new-product', newProduct => {
        Products.save(newProduct);
        io.emit('products', Products.getAll());
    });

    //carga de mensajes
    socket.emit('messages', await Messages.getAll());

    //envio de mensaje
    socket.on('new-message', async message => {
        message.time = new Date().toLocaleString();
        await Messages.saveMessage(message);
        io.emit('messages', await Messages.getAll());
    });
});
    
//LISTEN========================================================/
httpServer.listen(PORT, () => {
    console.log("SERVIDOR ACTIVO EN EL PUERTO 8080");
});