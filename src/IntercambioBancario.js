const HeaderArquivo = require('./Model/HeaderArquivo');
const TrailerArquivo = require('./Model/TrailerArquivo');

module.exports = class IntercambioBancario {
    constructor(layout) {
        this._layout = layout;
        this.header = new HeaderArquivo();
        this.trailer = new TrailerArquivo();
        this.lotes = [];
    }

    getLayout() {
        return this._layout;
    }

    inserirLote(lote) {
        this.lotes.push(lote);

        return this;
    }

    removerLote(sequencial) {
        let found = -1;

        this.lotes.forEach((lote, index) => {
            if (lote.sequencial === sequencial) {
                found = index;
            }
        });

        if (found > -1) {
            delete this.lotes[found];
        }

        return this;
    }

    limparLotes() {
        this.lotes = [];

        return this;
    }

    toJSON() {
        let headerArquivo = this.header.toJSON();
        let trailerArquivo = this.trailer.toJSON();
        let lotes = this.lotes;

        return {
            header_arquivo: headerArquivo,
            lotes,
            trailer_arquivo: trailerArquivo,
        };
    }
};