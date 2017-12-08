import path from 'path';

module.exports = class Layout {
    constructor(banco, layout = '240', arquivo, layoutPath = '../../layouts') {
        this._arquivo = arquivo;
        this._config = require(path.resolve(`${layoutPath}/${banco}/${layout}/${arquivo}.json`));
    }

    getRemessaLayout() {
        if (!this._config['remessa']) {
            throw new Error(`Falta a seção 'remessa' no arquivo de layout ${this._arquivo}`);
        }

        return this._config['remessa'];
    }

    getRetornoLayout() {
        if (!this._config['retorno']) {
            throw new Error(`Falta a seção 'retorno' no arquivo de layout ${this._arquivo}`);
        }

        return this._config['retorno'];
    }

    getVersao() {
        return (!this._config['retorno']) ? null : this._config['retorno'];
    }

    getServico() {
        return (!this._config['servico']) ? null : this._config['servico'];
    }

    getLayout() {
        return (!this._config['layout']) ? null : this._config['layout'];
    }

    getPrimeiroCodigoSegmentoRetorno() {
        let layout = this.getRetornoLayout();
        let segmentos = Object.keys(layout['detalhes']);
        let primeiroSegmento = segmentos[0];
        let partes = primeiroSegmento.split('_');

        return partes[partes.length - 1].toLowerCase();
    }

    getUltimoCodigoSegmentoRetorno() {
        let layout = this.getRetornoLayout();
        let segmentos = Object.keys(layout['detalhes']);
        let ultimoSegmento = segmentos[segmentos.length - 1];
        let partes = ultimoSegmento.split('_');

        return partes[partes.length - 1].toLowerCase();
    }
}