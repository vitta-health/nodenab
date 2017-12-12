'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var IntercambioBancarioFileAbstract = require('./IntercambioBancarioFileAbstract');
var Picture = require('./Format/Picture');
var Retorno = require('./Model/Retorno');
var Linha = require('./Model/Linha');

module.exports = function (_IntercambioBancarioF) {_inherits(IntercambioBancarioRetornoFileAbstract, _IntercambioBancarioF);_createClass(IntercambioBancarioRetornoFileAbstract, null, [{ key: 'REGISTRO_HEADER_ARQUIVO', get: function get()
        {
            return 0;
        } }, { key: 'REGISTRO_HEADER_LOTE', get: function get()

        {
            return 1;
        } }, { key: 'REGISTRO_DETALHES', get: function get()

        {
            return 3;
        } }, { key: 'REGISTRO_TRAILER_ARQUIVO', get: function get()

        {
            return 9;
        } }]);

    function IntercambioBancarioRetornoFileAbstract(layout, linhas) {_classCallCheck(this, IntercambioBancarioRetornoFileAbstract);var _this = _possibleConstructorReturn(this, (IntercambioBancarioRetornoFileAbstract.__proto__ || Object.getPrototypeOf(IntercambioBancarioRetornoFileAbstract)).call(this));

        _this._layout = layout;
        _this._linhas = [];
        _this._totalLotes = 0;
        linhas.split("\n").forEach(function (linha) {
            if (linha === '') {
                return;
            }

            _this._linhas.push(linha);
        });

        if (!_this._linhas) {
            throw new Error('O arquivo de retorno passado \xE9 inv\xE1lido');
        }

        _this._calculaTotalLotes();
        _this._model = new Retorno();return _this;
    }_createClass(IntercambioBancarioRetornoFileAbstract, [{ key: '_calculaTotalLotes', value: function _calculaTotalLotes()

        {
            this._totalLotes = 1;
            var layout = this._layout.getLayout();
            var linhaTrailerArquivoStr = this._linhas[this._linhas.length - 1];

            var linha = new Linha(linhaTrailerArquivoStr, this._layout, 'retorno');

            if (layout === '240') {
                var definicao = { pos: [18, 23], picture: '9(6)' };

                this._totalLotes = +linha.obterValorCampo(definicao);
            } else {
                this._totalLotes = 1;
            }

            return this._totalLotes;
        } }, { key: 'getTotalLotes', value: function getTotalLotes()

        {
            return this._totalLotes;
        } }]);return IntercambioBancarioRetornoFileAbstract;}(IntercambioBancarioFileAbstract);