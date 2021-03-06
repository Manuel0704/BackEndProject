const socket = io('http://localhost:8080');

//FUNCIONES==================================================
const getProductsHTML = products => {
    return fetch('./template/products.hbs')
        .then(res => res.text())
        .then(template => {
            const compiled = Handlebars.compile(template);
            return compiled({ products });
        });
};

const getMessagesHTML = messages => {
    return messages.map(message => `<div>
            <b style="color: blue;">${message.author} </b>
            <span style="color: brown;">[${message.time}]: </span>
            <i style="color: green;">${message.text}</i>
        </div>`).join(' ');
};

//CREACION DE PRODUCTO=======================================
const product_form = document.getElementById('form-products');
product_form.addEventListener('submit', e => {
    e.preventDefault();
    const new_product = { title: product_form[0].value, price: product_form[1].value, thumbnail: product_form[2].value };
    socket.emit('new-product', new_product);
    product_form.reset();
});

socket.on('products', products => {
    getProductsHTML(products).then(html => document.getElementById(('Productos')).innerHTML = html);
});

//ENVIO DE MENSAJE===========================================
const input_autor = document.getElementById('author-input');
const input_message = document.getElementById('message-input');
const button_send = document.getElementById('send-button');

const message_form = document.getElementById('form-messages');
message_form.addEventListener('submit', e => {
    e.preventDefault();
    const message = { author: input_autor.value, text: input_message.value };
    socket.emit('new-message', message);
    message_form.reset();
});

socket.on('messages', messages => {
    document.getElementById('Mensajes').innerHTML = getMessagesHTML(messages);
});

//===========================================================
input_autor.addEventListener('input', e => {
    input_message.disabled = !input_autor.value.length;
    button_send.disabled = !input_autor.value.length || !input_message.value.length;
});

input_message.addEventListener('input', e => {
    button_send.disabled = !input_message.value.length;
});