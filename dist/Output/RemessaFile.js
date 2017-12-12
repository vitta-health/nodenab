'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var fs = require('fs');
var path = require('path');
var IntercambioBancarioRemessaFileAbstract = require('../IntercambioBancarioRemessaFileAbstract');

module.exports = function (_IntercambioBancarioR) {_inherits(RemessaFile, _IntercambioBancarioR);function RemessaFile() {_classCallCheck(this, RemessaFile);return _possibleConstructorReturn(this, (RemessaFile.__proto__ || Object.getPrototypeOf(RemessaFile)).apply(this, arguments));}_createClass(RemessaFile, [{ key: 'generate', value: function generate()




        {
            var headerArquivo = this._encodeHeaderArquivo();
            var lotes = this._encodeLotes();
            var trailerArquivo = this._encodeTrailerArquivo();

            var data = [headerArquivo, lotes, trailerArquivo].join(RemessaFile.CNAB_EOL);
            data += RemessaFile.CNAB_EOL;

            return data;
        } }, { key: '_encodeHeaderArquivo', value: function _encodeHeaderArquivo()

        {
            if (!this._model.header) return;

            var layout = this._model.getLayout();
            var layoutRemessa = layout.getRemessaLayout();

            return this._encode(layoutRemessa['header_arquivo'], this._model.header._data);
        } }, { key: '_encodeLotes', value: function _encodeLotes()

        {var _this2 = this;
            var encoded = [];

            this._model.lotes.forEach(function (lote) {
                if (lote.header) {
                    encoded.push(_this2._encodeHeaderLote(lote));
                }

                encoded.push(_this2._encodeDetalhes(lote));

                if (lote.trailer) {
                    encoded.push(_this2._encodeTrailerLote(lote));
                }
            });

            return encoded.join(RemessaFile.CNAB_EOL);
        } }, { key: '_encodeHeaderLote', value: function _encodeHeaderLote(

        model) {
            if (!model.header) {
                return;
            }

            var layout = model.getLayout();

            return this._encode(layout['header_lote'], model.header._data);
        } }, { key: '_encodeDetalhes', value: function _encodeDetalhes(

        model) {var _this3 = this;
            if (!model.detalhes) {
                return;
            }

            var layout = model.getLayout();
            var encoded = [];

            model.detalhes.forEach(function (detalhe) {
                Object.keys(detalhe).forEach(function (segmento) {
                    var segmentoEncoded = _this3._encode(layout['detalhes'][segmento], detalhe[segmento]);
                    encoded.push(segmentoEncoded);
                });
            });

            return encoded.join(RemessaFile.CNAB_EOL);
        } }, { key: '_encodeTrailerLote', value: function _encodeTrailerLote(

        model) {
            if (!model.trailer) {
                return;
            }

            var layout = model.getLayout();

            return this._encode(layout['trailer_lote'], model.trailer._data);
        } }, { key: '_encodeTrailerArquivo', value: function _encodeTrailerArquivo()

        {
            if (!this._model.trailer) {
                return;
            }

            var layout = this._model.getLayout();
            var layoutRemessa = layout.getRemessaLayout();

            return this._encode(layoutRemessa['trailer_arquivo'], this._model.trailer._data);
        } }], [{ key: 'CNAB_EOL', get: function get() {return '\r\n';} }]);return RemessaFile;}(IntercambioBancarioRemessaFileAbstract);