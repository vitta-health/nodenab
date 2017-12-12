'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Picture = require('../Format/Picture');
var HeaderLote = require('./HeaderLote');
var TrailerLote = require('./TrailerLote');

module.exports = function () {
    function Lote() {var _this = this;var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var sequencial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;_classCallCheck(this, Lote);
        this.layout = layout;
        this.sequencial = sequencial;

        this.header = null;
        this.trailer = null;
        this.detalhes = [];

        if (this.layout['header_lote']) {
            this.header = new HeaderLote();
            Object.keys(this.layout['header_lote']).forEach(function (field) {
                _this.header.set(
                field,
                _this.layout['header_lote'][field]['default'] !== undefined ?
                Picture.encode(
                _this.layout['header_lote'][field]['default'],
                _this.layout['header_lote'][field]['picture']) :

                '');

            });
        }

        if (this.layout['trailer_lote']) {
            this.trailer = new TrailerLote();
            Object.keys(this.layout['trailer_lote']).forEach(function (field) {
                _this.trailer.set(
                field,
                _this.layout['trailer_lote'][field]['default'] !== undefined ?
                Picture.encode(
                _this.layout['trailer_lote'][field]['default'],
                _this.layout['trailer_lote'][field]['picture']) :

                '');

            });
        }
    }_createClass(Lote, [{ key: 'getLayout', value: function getLayout()

        {
            return this.layout;
        } }, { key: 'novoDetalhe', value: function novoDetalhe()

        {var _this2 = this;var excetoSegmentos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var detalhe = {};

            if (this.layout['detalhes']) {
                Object.keys(this.layout['detalhes']).forEach(function (segmento) {
                    if (excetoSegmentos.includes(segmento)) {
                        return;
                    }

                    detalhe[segmento] = {};

                    Object.keys(_this2.layout['detalhes'][segmento]).forEach(function (field) {
                        detalhe[segmento][field] = _this2.layout['detalhes'][segmento][field]['default'] !== undefined ?
                        Picture.encode(
                        _this2.layout['detalhes'][segmento][field]['default'],
                        _this2.layout['detalhes'][segmento][field]['picture']) :

                        '';
                    });
                });
            }

            return detalhe;
        } }, { key: 'inserirDetalhe', value: function inserirDetalhe(

        detalhe) {
            this.detalhes.push(detalhe);

            return this;
        } }, { key: 'countDetalhes', value: function countDetalhes()

        {
            return this.detalhes.length;
        } }, { key: 'limpaDetalhes', value: function limpaDetalhes()

        {
            this.detalhes = [];

            return this;
        } }, { key: 'toJSON', value: function toJSON()

        {
            var headerLote = this.header ? this.header.toJSON() : null;
            var trailerLote = this.trailer ? this.trailer.toJSON() : null;
            var detalhes = this.detalhes;

            return {
                codigo_lote: this.sequencial,
                header_lote: headerLote,
                detalhes: detalhes,
                trailer_lote: trailerLote };

        } }]);return Lote;}();