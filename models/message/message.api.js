const { promises: fs } = require('fs');

class MessageAPI {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async getById(id) {
        const messages = await this.getAll();
        return messages.find(m => m.id === +id);
    }
    async getAll() {
        try {
            const messages = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(messages);
        } catch (error) {
            return [];
        }
    }
    async saveMessage(message) {
        const messages = await this.getAll();
        let newId = messages.length == 0 ? 1 : messages[messages.length - 1].id + 1;
        const newMessage = { id: newId, ...message };
        messages.push(newMessage);
        try {
            await fs.writeFile(this.ruta, JSON.stringify(messages, null, 4));
            return newId;
        } catch (error) {
            throw new Error("error al guardar el producto");
        }
    }
    async deleteAll() {
        try {
            await fs.writeFile(this.ruta, "[]");
        } catch (error) {
            throw new Error(`ERROR AL BORRAR LOS MENSAJES ${error}`);
        }
    }
}

module.exports = MessageAPI;