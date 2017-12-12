'use strict';var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var path = require('path');

module.exports = function () {
    function Layout(banco) {var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '240';var arquivo = arguments[2];var _ref = arguments[3];var _ref$layoutPath = _ref.layoutPath,layoutPath = _ref$layoutPath === undefined ? '../../layouts' : _ref$layoutPath,_ref$loadFromFile = _ref.loadFromFile,loadFromFile = _ref$loadFromFile === undefined ? true : _ref$loadFromFile;_classCallCheck(this, Layout);
        this._arquivo = arquivo;
        if (loadFromFile) {
            this._config = require(path.resolve(layoutPath + '/' + banco + '/' + layout + '/' + arquivo + '.json'));
        } else {
            if ((typeof arquivo === 'undefined' ? 'undefined' : _typeof(arquivo)) === "object" &&
            Object.keys(arquivo).includes('servico') &&
            Object.keys(arquivo).includes('versao') &&
            Object.keys(arquivo).includes('layout') &&
            Object.keys(arquivo).includes('remessa') &&
            Object.keys(arquivo).includes('retorno') &&
            arquivo['layout'] === layout) {
                this._config = arquivo;
            } else {
                throw new Error('O layout informado é inválido');
            }
        }
    }_createClass(Layout, [{ key: 'getRemessaLayout', value: function getRemessaLayout()

        {
            if (!this._config['remessa']) {
                throw new Error('Falta a se\xE7\xE3o \'remessa\' no arquivo de layout');
            }

            return this._config['remessa'];
        } }, { key: 'getRetornoLayout', value: function getRetornoLayout()

        {
            if (!this._config['retorno']) {
                throw new Error('Falta a se\xE7\xE3o \'retorno\' no arquivo de layout');
            }

            return this._config['retorno'];
        } }, { key: 'getVersao', value: function getVersao()

        {
            return !this._config['retorno'] ? null : this._config['retorno'];
        } }, { key: 'getServico', value: function getServico()

        {
            return !this._config['servico'] ? null : this._config['servico'];
        } }, { key: 'getLayout', value: function getLayout()

        {
            return !this._config['layout'] ? null : this._config['layout'];
        } }, { key: 'getPrimeiroCodigoSegmentoRetorno', value: function getPrimeiroCodigoSegmentoRetorno()

        {
            var layout = this.getRetornoLayout();
            var segmentos = Object.keys(layout['detalhes']);
            var primeiroSegmento = segmentos[0];
            var partes = primeiroSegmento.split('_');

            return partes[partes.length - 1].toLowerCase();
        } }, { key: 'getUltimoCodigoSegmentoRetorno', value: function getUltimoCodigoSegmentoRetorno()

        {
            var layout = this.getRetornoLayout();
            var segmentos = Object.keys(layout['detalhes']);
            var ultimoSegmento = segmentos[segmentos.length - 1];
            var partes = ultimoSegmento.split('_');

            return partes[partes.length - 1].toLowerCase();
        } }]);return Layout;}();