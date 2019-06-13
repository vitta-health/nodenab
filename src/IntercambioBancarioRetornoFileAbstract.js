const IntercambioBancarioFileAbstract = require('./IntercambioBancarioFileAbstract');
const Picture = require('./Format/Picture');
const Retorno = require('./Model/Retorno');
const Linha = require('./Model/Linha');

module.exports = class IntercambioBancarioRetornoFileAbstract extends IntercambioBancarioFileAbstract {
    static get REGISTRO_HEADER_ARQUIVO() {
        return 0;
    }

    static get REGISTRO_HEADER_LOTE() {
        return 1;
    }

    static get REGISTRO_DETALHES() {
        return 3;
    }

    static get REGISTRO_TRAILER_ARQUIVO() {
        return 9;
    }

    constructor(layout, linhas, tipo = 'retorno') {
        super();
        this._layout = layout;
        this._tipo = tipo;
        this._linhas = [];
        this._totalLotes = 0;
        linhas.split("\n").forEach((linha) => {
            if (linha === '') {
                return;
            }

            this._linhas.push(linha);
        });

        if (!this._linhas) {
            throw new Error(`O arquivo de retorno passado é inválido`);
        }

        this._calculaTotalLotes();
        this._model = new Retorno();
    }

    _calculaTotalLotes() {
        this._totalLotes = 1;
        const layout = this._layout.getLayout();
        const linhaTrailerArquivoStr = this._linhas[this._linhas.length - 1];

        let linha = new Linha(linhaTrailerArquivoStr, this._layout, 'retorno');

        if (layout === '240') {
            const definicao = {pos: [18,23], picture: '9(6)'};

            this._totalLotes = +(linha.obterValorCampo(definicao));
        } else {
            this._totalLotes = 1;
        }

        return this._totalLotes;
    }

    getTotalLotes() {
        return this._totalLotes;
    }


};