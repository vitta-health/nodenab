'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Picture = require('../Format/Picture');

module.exports = function () {
    function Linha(linhaStr, layout) {var tipo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'remessa';_classCallCheck(this, Linha);
        this.linhaStr = linhaStr;
        this.layout = layout;
        this.tipo = tipo.toLowerCase();
    }_createClass(Linha, [{ key: 'getDadosSegmento', value: function getDadosSegmento(

        segmentoKey) {var _this = this;
            var layout = this.tipo === 'remessa' ?
            this.layout.getRemessaLayout() :
            this.layout.getRetornoLayout();

            if (layout['detalhes'][segmentoKey] === undefined) {
                throw new Error('Erro ao processar o segumento ' + segmentoKey + '. N\xE3o foi poss\xEDvel identificar um layout v\xE1lido para o mesmo');
            }

            var campos = layout['detalhes'][segmentoKey];
            var dados = {};

            Object.keys(campos).forEach(function (nome) {
                dados[nome] = _this.obterValorCampo(campos[nome]);
            });

            return dados;
        } }, { key: 'obterValorCampo', value: function obterValorCampo(

        definicao) {
            var tipo = void 0;

            if (tipo = Picture.REGEX_VALID_FORMAT.exec(definicao['picture'])) {
                var inicio = definicao['pos'][0] - 1;
                var tamanho = Picture.getLength(definicao['picture']);

                return Picture.decode(this.linhaStr.substr(inicio, tamanho), definicao['picture']);
            } else {
                throw new Error('Erro ao obter valor de campo. O padr\xE3o (' + format + ') n\xE3o \xE9 um formato v\xE1lido');
            }
        } }, { key: 'getLayout', value: function getLayout()

        {
            return this.layout;
        } }, { key: 'getTipo', value: function getTipo()

        {
            return this.tipo;
        } }]);return Linha;}();