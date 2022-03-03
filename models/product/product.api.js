class ProductsAPI {
    constructor() {
        this.products = [];
    }
    static idCount = 0;

    getAll() {
        return [...this.products];
    }
    getById(pId) {
        const product = this.products.find(prod => prod.id === +pId);
        return product || { error: `Producto ${pId} no encontrado!` };
    }
    save(prod) {
        const newProd = { id: ++ProductsAPI.idCount, ...prod };
        this.products.push(newProd);
        return newProd;
    }
    update(prod, pId) {
        const id = this.products.findIndex(i => i.id === +pId);
        if (id < 0) return { error: `Producto ${+pId} no encontrado!` };
        this.products[id] = { id: +pId, ...prod };
        return this.products[id];
    }
    delete(pId) {
        const id = this.products.findIndex(prod => prod.id === +pId);
        if (id < 0) return { error: `Producto ${+pId} no encontrado!` }
        return this.products.splice(id, 1);
    }
    deleteAll() {
       this.products = []; 
    }
}

module.exports = ProductsAPI;