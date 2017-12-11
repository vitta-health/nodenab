module.exports = class Retorno {
    constructor() {
        this.headerArquivo = {};
        this.trailerArquivo = {};
        this.lotes = [];
    }

    decodeHeaderLote(linha) {
        const layout = (linha.getTipo() === 'remessa') ?
            linha.getLayout().getRemessaLayout() :
            linha.getLayout().getRetornoLayout();
        const campos = layout['header_lote'];
        let dados = {};

        Object.keys(campos).forEach((nome) => {
            dados[nome] = linha.obterValorCampo(campos[nome])
        });

        return dados;
    }

    decodeTrailerLote(linha) {
        const layout = (linha.getTipo() === 'remessa') ?
            linha.getLayout().getRemessaLayout() :
            linha.getLayout().getRetornoLayout();
        const campos = layout['trailer_lote'];
        let dados = {};

        Object.keys(campos).forEach((nome) => {
            dados[nome] = linha.obterValorCampo(campos[nome])
        });

        return dados;
    }

    getTotalLotes() {
        return this.lotes.length;
    }

    getTotalTitulos() {
        let total = 0;

        this.lotes.forEach((lote) => {
            total += lote['titulos'].length;
        });

        return total;
    }

    toJSON() {
        return  {
            header: this.headerArquivo,
            trailer: this.trailerArquivo,
            lotes: this.lotes
        };
    }
};