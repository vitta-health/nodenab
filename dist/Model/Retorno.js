'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}module.exports = function () {
    function Retorno() {_classCallCheck(this, Retorno);
        this.headerArquivo = {};
        this.trailerArquivo = {};
        this.lotes = [];
    }_createClass(Retorno, [{ key: 'decodeHeaderLote', value: function decodeHeaderLote(

        linha) {
            var layout = linha.getTipo() === 'remessa' ?
            linha.getLayout().getRemessaLayout() :
            linha.getLayout().getRetornoLayout();
            var campos = layout['header_lote'];
            var dados = {};

            Object.keys(campos).forEach(function (nome) {
                dados[nome] = linha.obterValorCampo(campos[nome]);
            });

            return dados;
        } }, { key: 'decodeTrailerLote', value: function decodeTrailerLote(

        linha) {
            var layout = linha.getTipo() === 'remessa' ?
            linha.getLayout().getRemessaLayout() :
            linha.getLayout().getRetornoLayout();
            var campos = layout['trailer_lote'];
            var dados = {};

            Object.keys(campos).forEach(function (nome) {
                dados[nome] = linha.obterValorCampo(campos[nome]);
            });

            return dados;
        } }, { key: 'getTotalLotes', value: function getTotalLotes()

        {
            return this.lotes.length;
        } }, { key: 'getTotalTitulos', value: function getTotalTitulos()

        {
            var total = 0;

            this.lotes.forEach(function (lote) {
                total += lote['titulos'].length;
            });

            return total;
        } }, { key: 'toJSON', value: function toJSON()

        {
            return {
                header: this.headerArquivo,
                trailer: this.trailerArquivo,
                lotes: this.lotes };

        } }]);return Retorno;}();