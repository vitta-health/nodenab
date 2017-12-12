const Picture = require('../Format/Picture');
const IntercambioBancario = require('../IntercambioBancario');
const Lote = require('./Lote');

module.exports = class Remessa extends IntercambioBancario {
    constructor(layout) {
        super(layout);

        let remessaLayout = this._layout.getRemessaLayout();

        if (remessaLayout['header_arquivo']) {
            Object.keys(remessaLayout['header_arquivo']).forEach((field) => {
                this.header.set(
                    field,
                    (remessaLayout['header_arquivo'][field]['default'] !== undefined) ?
                        Picture.encode(
                            remessaLayout['header_arquivo'][field]['default'],
                            remessaLayout['header_arquivo'][field]['picture'],
                            { field }
                        ) :
                        ''
                );
            })
        }

        if (remessaLayout['trailer_arquivo']) {
            Object.keys(remessaLayout['trailer_arquivo']).forEach((field) => {
                this.trailer.set(
                    field,
                    (remessaLayout['trailer_arquivo'][field]['default'] !== undefined) ?
                        Picture.encode(
                            remessaLayout['trailer_arquivo'][field]['default'],
                            remessaLayout['trailer_arquivo'][field]['picture'],
                            { field }
                        ) :
                        ''
                );
            })
        }
    }

    novoLote(sequencial = 1) {
        return new Lote(this._layout.getRemessaLayout(), sequencial);
    }
};