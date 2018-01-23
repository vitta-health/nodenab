'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var IntercambioBancarioRetornoFileAbstract = require('../IntercambioBancarioRetornoFileAbstract');
var Linha = require('../Model/Linha');

module.exports = function (_IntercambioBancarioR) {_inherits(RetornoFile, _IntercambioBancarioR);function RetornoFile() {_classCallCheck(this, RetornoFile);return _possibleConstructorReturn(this, (RetornoFile.__proto__ || Object.getPrototypeOf(RetornoFile)).apply(this, arguments));}_createClass(RetornoFile, [{ key: 'generate', value: function generate()
        {var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            this._decodeHeaderArquivo();
            this._decodeTrailerArquivo();
            this._decodeLotes();

            return this._model;
        } }, { key: '_decodeHeaderArquivo', value: function _decodeHeaderArquivo()

        {var _this2 = this;
            var layout = this._layout.getRetornoLayout();
            var headerArquivoDef = layout['header_arquivo'];
            var linha = new Linha(this._linhas[0], this._layout, 'retorno');

            Object.keys(headerArquivoDef).forEach(function (campo) {
                _this2._model.headerArquivo[campo] = linha.obterValorCampo(headerArquivoDef[campo]);
            });
        } }, { key: '_decodeTrailerArquivo', value: function _decodeTrailerArquivo()

        {var _this3 = this;
            var layout = this._layout.getRetornoLayout();
            var trailerArquivoDef = layout['trailer_arquivo'];
            var linha = new Linha(this._linhas[this._linhas.length - 1], this._layout, 'retorno');

            Object.keys(trailerArquivoDef).forEach(function (campo) {
                _this3._model.trailerArquivo[campo] = linha.obterValorCampo(trailerArquivoDef[campo]);
            });
        } }, { key: '_decodeLotes', value: function _decodeLotes()

        {
            var tipoLayout = this._layout.getLayout();

            if (tipoLayout === '240') {
                this._decodeLotesCNAB240();
            } else if (tipoLayout === '400') {
                this._decodeLotesCNAB400();
            }
        } }, { key: '_decodeLotesCNAB240', value: function _decodeLotesCNAB240()


        {var _this4 = this;
            var defTipoRegistro = { pos: [8, 8], picture: '9(1)' };
            var defCodigoLote = { pos: [4, 7], picture: '9(4)' };
            var defCodigoSegmento = { pos: [14, 14], picture: 'X(1)' };
            var codigoLote = null;
            var lote = null;
            var titulos = [];
            var segmentos = {};
            var primeiroCodigoSegmentoLayout = this._layout.getPrimeiroCodigoSegmentoRetorno();
            var ultimoCodigoSegmentoLayout = this._layout.getUltimoCodigoSegmentoRetorno();


            this._linhas.forEach(function (linhaStr, index) {
                var linha = new Linha(linhaStr, _this4._layout, 'retorno');
                var tipoRegistro = +linha.obterValorCampo(defTipoRegistro);

                if (tipoRegistro === IntercambioBancarioRetornoFileAbstract.REGISTRO_HEADER_ARQUIVO) {
                    return;
                }

                switch (tipoRegistro) {
                    case IntercambioBancarioRetornoFileAbstract.REGISTRO_HEADER_LOTE:
                        codigoLote = linha.obterValorCampo(defCodigoLote);
                        lote = {
                            codigoLote: codigoLote,
                            headerLote: _this4._model.decodeHeaderLote(linha),
                            trailerLote: _this4._model.decodeTrailerLote(linha),
                            titulos: [] };


                        break;

                    case IntercambioBancarioRetornoFileAbstract.REGISTRO_DETALHES:
                        var codigoSegmento = linha.obterValorCampo(defCodigoSegmento);
                        var dadosSegmento = linha.getDadosSegmento('segmento_' + codigoSegmento.toLowerCase());
                        segmentos[codigoSegmento] = dadosSegmento;
                        var proximaLinha = new Linha(_this4._linhas[index + 1], _this4._layout, 'retorno');
                        var proximoCodigoSegmento = proximaLinha.obterValorCampo(defCodigoSegmento);

                        if (codigoSegmento.toLowerCase() === ultimoCodigoSegmentoLayout.toLowerCase() ||
                        proximoCodigoSegmento.toLowerCase() === primeiroCodigoSegmentoLayout.toLowerCase()) {
                            if (!(Array.isArray(segmentos) && segmentos.length === 0)) {
                                lote['titulos'].push(segmentos);
                                segmentos = [];
                            }
                        }

                        break;

                    case IntercambioBancarioRetornoFileAbstract.REGISTRO_TRAILER_ARQUIVO:
                        _this4._model.lotes.push(lote);
                        titulos = [];
                        segmentos = {};

                        break;}

            });
        } }, { key: '_decodeLotesCNAB400', value: function _decodeLotesCNAB400()


        {var _this5 = this;
            var defTipoRegistro = { pos: [1, 1], picture: '9(1)' };
            var defCodigoSegmento = { pos: [1, 1], picture: '9(1)' };
            var lote = { titulos: {} };

            var primeiroCodigoSegmentoLayout = this._layout.getPrimeiroCodigoSegmentoRetorno().toString();
            var ultimoCodigoSegmentoLayout = this._layout.getUltimoCodigoSegmentoRetorno().toString();

            this._linhas.forEach(function (linhaStr, index) {
                var linha = new Linha(linhaStr, _this5._layout, 'retorno');
                var tipoRegistro = +linha.obterValorCampo(defTipoRegistro);

                if (tipoRegistro === IntercambioBancarioRetornoFileAbstract.REGISTRO_TRAILER_ARQUIVO) {
                    return;
                }

                if (tipoRegistro !== IntercambioBancarioRetornoFileAbstract.REGISTRO_HEADER_ARQUIVO) {

                    var codigoSegmento = linha.obterValorCampo(defCodigoSegmento).toString();

                    if (!lote['titulos'][codigoSegmento]) {
                        lote['titulos'][codigoSegmento] = [];
                    }

                    lote['titulos'][codigoSegmento].push(linha.getDadosSegmento('segmento_' + codigoSegmento.toLowerCase()));

                    var proximaLinha = new Linha(_this5._linhas[index + 1], _this5._layout, 'retorno');
                    var proximoCodigoSegmento = proximaLinha.obterValorCampo(defCodigoSegmento).toString();

                    if (proximoCodigoSegmento.toLowerCase() === primeiroCodigoSegmentoLayout.toLowerCase() ||
                    codigoSegmento.toLowerCase() === ultimoCodigoSegmentoLayout.toLowerCase()) {
                    }


                }
            });

            this._model.lotes.push(lote);
        } }]);return RetornoFile;}(IntercambioBancarioRetornoFileAbstract);