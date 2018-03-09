const IntercambioBancarioRetornoFileAbstract = require('../IntercambioBancarioRetornoFileAbstract');
const Linha = require('../Model/Linha');

module.exports = class RetornoFile extends IntercambioBancarioRetornoFileAbstract{
    generate(path = null) {
        this._decodeHeaderArquivo();
        this._decodeTrailerArquivo();
        this._decodeLotes();

        return this._model;
    }

    _decodeHeaderArquivo() {
        const layout = this._layout.getRetornoLayout();
        const headerArquivoDef = layout['header_arquivo'];
        let linha = new Linha(this._linhas[0], this._layout, 'retorno');

        Object.keys(headerArquivoDef).forEach((campo) => {
            this._model.headerArquivo[campo] = linha.obterValorCampo(headerArquivoDef[campo]);
        });
    }

    _decodeTrailerArquivo() {
        const layout = this._layout.getRetornoLayout();
        const trailerArquivoDef = layout['trailer_arquivo'];
        let linha = new Linha(this._linhas[this._linhas.length - 1], this._layout, 'retorno');

        Object.keys(trailerArquivoDef).forEach((campo) => {
            this._model.trailerArquivo[campo] = linha.obterValorCampo(trailerArquivoDef[campo]);
        });
    }

    _decodeLotes() {
        const tipoLayout = this._layout.getLayout();

        if (tipoLayout === '240') {
            this._decodeLotesCNAB240();
        } else if (tipoLayout === '400') {
            this._decodeLotesCNAB400();
        }
    }


    _decodeLotesCNAB240() {
        const defTipoRegistro = { pos: [8, 8], picture: '9(1)' };
        const defCodigoLote = { pos: [4, 7], picture: '9(4)' };
        const defCodigoSegmento = { pos: [14, 14], picture: 'X(1)' };
        let codigoLote = null;
        let lote = null;
        let titulos = [];
        let segmentos = {};
        let primeiroCodigoSegmentoLayout = this._layout.getPrimeiroCodigoSegmentoRetorno();
        let ultimoCodigoSegmentoLayout = this._layout.getUltimoCodigoSegmentoRetorno();


        this._linhas.forEach((linhaStr, index) => {
           let linha = new Linha(linhaStr, this._layout, 'retorno');
           let tipoRegistro = +(linha.obterValorCampo(defTipoRegistro));

           if (tipoRegistro === IntercambioBancarioRetornoFileAbstract.REGISTRO_HEADER_ARQUIVO) {
               return;
           }

           switch (tipoRegistro) {
               case IntercambioBancarioRetornoFileAbstract.REGISTRO_HEADER_LOTE:
                   codigoLote = linha.obterValorCampo(defCodigoLote);
                   lote = {
                       codigoLote : codigoLote,
                       headerLote : this._model.decodeHeaderLote(linha),
                       trailerLote: this._model.decodeTrailerLote(linha),
                       titulos: [],
                   };

                   break;

               case IntercambioBancarioRetornoFileAbstract.REGISTRO_DETALHES:
                   let codigoSegmento = linha.obterValorCampo(defCodigoSegmento);
                   let dadosSegmento = linha.getDadosSegmento(`segmento_${codigoSegmento.toLowerCase()}`);
                   segmentos[codigoSegmento] = dadosSegmento;
                   let proximaLinha = new Linha(this._linhas[index + 1], this._layout, 'retorno');
                   let proximoCodigoSegmento = proximaLinha.obterValorCampo(defCodigoSegmento);

                   if (codigoSegmento.toLowerCase() === ultimoCodigoSegmentoLayout.toLowerCase() ||
                        proximoCodigoSegmento.toLowerCase() === primeiroCodigoSegmentoLayout.toLowerCase()) {
                       if (!(Array.isArray(segmentos) && segmentos.length === 0)) {
                           lote['titulos'].push(segmentos);
                           segmentos = [];
                       }
                   }

                   break;

               case IntercambioBancarioRetornoFileAbstract.REGISTRO_TRAILER_ARQUIVO:
                   this._model.lotes.push(lote);
                   titulos = [];
                   segmentos = {};

                   break;
           }
        });
    }


    _decodeLotesCNAB400() {
        const defTipoRegistro = { pos: [1, 1], picture: '9(1)' };
        const defCodigoSegmento = { pos: [1, 1], picture: '9(1)' };
        const lote = { titulos: [] };

        let primeiroCodigoSegmentoLayout = this._layout.getPrimeiroCodigoSegmentoRetorno().toString();
        let ultimoCodigoSegmentoLayout = this._layout.getUltimoCodigoSegmentoRetorno().toString();

        this._linhas.forEach((linhaStr, index) => {
           const linha = new Linha(linhaStr, this._layout, 'retorno');
           const tipoRegistro = +(linha.obterValorCampo(defTipoRegistro));

           if (tipoRegistro === IntercambioBancarioRetornoFileAbstract.REGISTRO_TRAILER_ARQUIVO) {
               return;
           }

           if (tipoRegistro !== IntercambioBancarioRetornoFileAbstract.REGISTRO_HEADER_ARQUIVO) {

               const codigoSegmento = linha.obterValorCampo(defCodigoSegmento).toString();
               const segmento = {};

               segmento[codigoSegmento] = linha.getDadosSegmento(`segmento_${codigoSegmento.toLowerCase()}`);

               lote['titulos'].push(segmento);

               const proximaLinha = new Linha(this._linhas[index + 1], this._layout, 'retorno');
               const proximoCodigoSegmento = proximaLinha.obterValorCampo(defCodigoSegmento).toString();

               if (proximoCodigoSegmento.toLowerCase() === primeiroCodigoSegmentoLayout.toLowerCase() ||
                   codigoSegmento.toLowerCase() === ultimoCodigoSegmentoLayout.toLowerCase()) {
               }


           }
        });

        this._model.lotes.push(lote);
    }
};