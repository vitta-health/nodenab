'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var HeaderArquivo = require('./Model/HeaderArquivo');
var TrailerArquivo = require('./Model/TrailerArquivo');

module.exports = function () {
    function IntercambioBancario(layout) {_classCallCheck(this, IntercambioBancario);
        this._layout = layout;
        this.header = new HeaderArquivo();
        this.trailer = new TrailerArquivo();
        this.lotes = [];
    }_createClass(IntercambioBancario, [{ key: 'getLayout', value: function getLayout()

        {
            return this._layout;
        } }, { key: 'inserirLote', value: function inserirLote(

        lote) {
            this.lotes.push(lote);

            return this;
        } }, { key: 'removerLote', value: function removerLote(

        sequencial) {
            var found = -1;

            this.lotes.forEach(function (lote, index) {
                if (lote.sequencial === sequencial) {
                    found = index;
                }
            });

            if (found > -1) {
                delete this.lotes[found];
            }

            return this;
        } }, { key: 'limparLotes', value: function limparLotes()

        {
            this.lotes = [];

            return this;
        } }, { key: 'toJSON', value: function toJSON()

        {
            var headerArquivo = this.header.toJSON();
            var trailerArquivo = this.trailer.toJSON();
            var lotes = this.lotes;

            return {
                header_arquivo: headerArquivo,
                lotes: lotes,
                trailer_arquivo: trailerArquivo };

        } }]);return IntercambioBancario;}();