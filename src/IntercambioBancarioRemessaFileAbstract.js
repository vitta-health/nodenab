const IntercambioBancarioFileAbstract = require('./IntercambioBancarioFileAbstract');
const Picture = require('./Format/Picture');

module.exports = class IntercambioBancarioRemessaFileAbstract extends IntercambioBancarioFileAbstract {
    constructor(model) {
        super();

        this._model = model;
    }

    _encode(fieldsDef, modelSection) {
        let encoded = '';

        Object.keys(fieldsDef).forEach((field) => {
            if (modelSection[field] !== undefined) {
                let format = fieldsDef[field]['picture'];
                encoded += Picture.encode(modelSection[field], format, { fieldDesc : fieldsDef[field] , field})
            }
        });

        return encoded;
    }
};