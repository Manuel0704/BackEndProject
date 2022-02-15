const express = require('express');
const { json } = require('express/lib/response');

const products = require('../data/data');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(products);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: 'El parametro debe ser un numero' });
    if (+id < 1 || +id > products.length) return res.json({ error: 'El producto no fue encontrado' });
    res.json(products[+id - 1]);
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) return res.json({ error: 'datos insuficientes' })
    const newProduct = {
        id: products.length + 1,
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    products.push(newProduct);
    res.json({ newproduct: newProduct });
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: '1-El parametro debe ser un numero' });
    if (+id < 1 || +id > products.length) return res.json({ error: '2-El producto no fue encontrado' });
    if (!products.some(product => product.id == +id)) return json({ error: '3-El producto no fue encontrado' });

    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) return res.json({ error: 'datos insuficientes' })
    const tempProduct = {
        id: id,
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    const foundIndex = products.findIndex(product => product.id === id)
    products[foundIndex] = tempProduct;
    return res.json({ updatedproduct: tempProduct });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: 'El parametro debe ser un numero' });
    if (+id < 1 || +id > products.length) return res.json({ error: 'El producto no fue encontrado' });

    const foundIndex = products.findIndex(product => product.id === +id);
    if (foundIndex !== -1) {
        products.splice(foundIndex, 1);
        res.json('El producto fue eliminado');
    }
    else res.json('El producto no existe');
})

module.exports = router;