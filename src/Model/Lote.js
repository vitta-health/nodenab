const Picture = require('../Format/Picture');
const HeaderLote = require('./HeaderLote');
const TrailerLote = require('./TrailerLote');

module.exports = class Lote {
    constructor(layout = {}, sequencial = 1) {
        this.layout = layout;
        this.sequencial = sequencial;

        this.header = null;
        this.trailer = null;
        this.detalhes = [];

        if (this.layout['header_lote']) {
            this.header = new HeaderLote();
            Object.keys(this.layout['header_lote']).forEach((field) => {
                this.header.set(
                    field,
                    (this.layout['header_lote'][field]['default'] !== undefined) ?
                        Picture.encode(
                            this.layout['header_lote'][field]['default'],
                            this.layout['header_lote'][field]['picture']
                        ) :
                        ''
                );
            })
        }

        if (this.layout['trailer_lote']) {
            this.trailer = new TrailerLote();
            Object.keys(this.layout['trailer_lote']).forEach((field) => {
                this.trailer.set(
                    field,
                    (this.layout['trailer_lote'][field]['default'] !== undefined) ?
                        Picture.encode(
                            this.layout['trailer_lote'][field]['default'],
                            this.layout['trailer_lote'][field]['picture']
                        ) :
                        ''
                );
            })
        }
    }

    getLayout() {
        return this.layout;
    }

    novoDetalhe(excetoSegmentos = []) {
        let detalhe = {};

        if (this.layout['detalhes']) {
            Object.keys(this.layout['detalhes']).forEach((segmento) => {
               if (excetoSegmentos.includes(segmento)) {
                   return;
               }

               detalhe[segmento] = {};

               Object.keys(this.layout['detalhes'][segmento]).forEach((field) => {
                   detalhe[segmento][field] = (this.layout['detalhes'][segmento][field]['default'] !== undefined) ?
                       Picture.encode(
                           this.layout['detalhes'][segmento][field]['default'],
                           this.layout['detalhes'][segmento][field]['picture']
                       ) :
                       '';
               })
            });
        }

        return detalhe;
    }

    inserirDetalhe(detalhe) {
        this.detalhes.push(detalhe);

        return this;
    }

    countDetalhes() {
        return this.detalhes.length;
    }

    limpaDetalhes() {
        this.detalhes = [];

        return this;
    }

    toJSON() {
        let headerLote = (this.header) ? this.header.toJSON() : null;
        let trailerLote = (this.trailer) ? this.trailer.toJSON() : null;
        let detalhes = this.detalhes;

        return {
            codigo_lote: this.sequencial,
            header_lote: headerLote,
            detalhes,
            trailer_lote: trailerLote,
        };
    }
};