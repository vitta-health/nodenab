module.exports = class IntercambioBancarioFileAbstract {
    constructor() {
        this._model = null;
    }

    generate(path) {
        throw new Error('You have to implement the method generate!');
    }
};