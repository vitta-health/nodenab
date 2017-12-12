'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var moment = require('moment');

module.exports = function () {function Picture() {_classCallCheck(this, Picture);}_createClass(Picture, null, [{ key: '_validarData', value: function _validarData(





        value) {
            return ('' + value).match(/^\d{4}-\d{2}-\d{2}$/) !== null;
        }

        /**
           * Valida o formato de um campo de acordo com sua picture
           * @param format {String} Formato do campo
           * @return {boolean}
           */ }, { key: 'validarFormato', value: function validarFormato(
        format) {
            return format.match(Picture.REGEX_VALID_FORMAT).length >= 0;
        }

        /**
           * Retorna o tamanho do campo dado seu formato
           * @param format {String} Formato do campo
           * @return {number}
           */ }, { key: 'getLength', value: function getLength(
        format) {
            var lengthMatches = void 0;

            if (lengthMatches = Picture.REGEX_VALID_FORMAT.exec(format)) {
                return +(lengthMatches[2] || 0) + +(lengthMatches[5] || 0);
            } else {
                throw new Error('O padr\xE3o (' + format + ') n\xE3o \xE9 um formato v\xE1lido');
            }
        }

        /**
           * Formata uma string para retornar somente números
           * @param value {String} Valor para formatar
           * @return {string}
           */ }, { key: 'parseNumber', value: function parseNumber(
        value) {
            return ('' + value).replace(/[^0-9.]/g, '').replace(/^0+/g, '') || '0';
        }

        /**
           * Encoda um valor baseado em um formato de picture de campo
           * @param value {*} Valor de entrada para o formato
           * @param format {String} Formato do campo do valor de entrada
           * @param options {Object} Opções adicionais do campo
           * @return {*}
           */ }, { key: 'encode', value: function encode(
        value, format) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var matches = void 0;

            if (matches = Picture.REGEX_VALID_FORMAT.exec(format)) {
                if (matches[1] === 'X' && !matches[4]) {
                    return ('' + value).substr(0, +(matches[2] || 0)).padEnd(+(matches[2] || 0), ' ');
                } else if (matches[1] === '9') {
                    var numericValue = value;
                    if (Picture._validarData(value)) {
                        if (options.dateFormat) {
                            numericValue = moment(value).format(options.dateFormat);
                        } else {
                            if (+(matches[2] || 0) === 8) {
                                numericValue = moment(value).format('DDMMYYYY');
                            }
                            if (+(matches[2] || 0) === 6) {
                                numericValue = moment(value).format('DDMMYY');
                            }
                        }
                    }

                    if (isNaN(+numericValue)) {
                        throw new Error('O valor (' + numericValue + ') informado deve ser um n\xFAmero no formato ' + format);
                    }

                    numericValue = Picture.parseNumber(numericValue);
                    var numericExpression = numericValue.split('.');

                    if (numericExpression[1] === undefined) {
                        numericExpression[1] = '0';
                    }

                    if (matches[4] === 'V9') {
                        var tamanhoLeft = +(matches[2] || 0);
                        var tamanhoRigth = +(matches[5] || 0);
                        var valorLeft = numericExpression[0].padStart(tamanhoLeft, '0');

                        if (numericExpression[1].length > tamanhoRigth) {
                            var extra = numericExpression[1].length - tamanhoRigth;
                            var extraPow = Math.pow(10, extra);

                            numericExpression[1] = '' + Math.round(numericExpression[1] / extraPow);
                        }

                        var valorRigth = numericExpression[1].padEnd(tamanhoRigth, '0');

                        return '' + valorLeft + valorRigth;
                    } else if (!matches[4]) {
                        return Picture.parseNumber(numericValue).padStart(+(matches[2] || 0), '0');
                    } else {
                        throw new Error('O padr\xE3o (' + format + ') n\xE3o \xE9 um formato v\xE1lido');
                    }
                }
            }
        }

        /**
           * Decoda um valor baseado em um formato de picture de campo
           * @param value {*} Valor de entrada para o decode
           * @param format {String} Formato do campo do valor de entrada
           * @param options {Object} Opções adicionais do campo
           * @return {*}
           */ }, { key: 'decode', value: function decode(
        value, format) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var matches = void 0;

            if (matches = Picture.REGEX_VALID_FORMAT.exec(format)) {
                if (matches[1] === 'X' && !matches[4]) {
                    return value.replace(/\s{1,}$/g, '');
                } else if (matches[1] === '9') {
                    if (matches[4] === 'V9') {
                        var tamanhoLeft = +(matches[2] || 0);
                        var tamanhoRigth = +(matches[5] || 0);
                        var valorLeft = Picture.parseNumber(value.substr(0, tamanhoLeft));
                        var valorRigth = '0.' + value.substr(tamanhoLeft, tamanhoRigth);

                        if (+valorRigth > 0) {
                            return +valorLeft + valorRigth;
                        } else {
                            return +Picture.parseNumber(valorLeft);
                        }
                    } else if (!matches[4]) {
                        return +Picture.parseNumber(value);
                    } else {
                        throw new Error('O padr\xE3o (' + format + ') n\xE3o \xE9 um formato v\xE1lido');
                    }
                }
            } else {
                throw new Error('O padr\xE3o (' + format + ') n\xE3o \xE9 um formato v\xE1lido');
            }
        } }, { key: 'REGEX_VALID_FORMAT', get: function get() {return (/([X9])\((\d{0,})\)((V9)\((\d{0,})\)?)?/g);} }]);return Picture;}();
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _IntercambioBancarioRetornoFileAbstract = require('../IntercambioBancarioRetornoFileAbstract');var _IntercambioBancarioRetornoFileAbstract2 = _interopRequireDefault(_IntercambioBancarioRetornoFileAbstract);
var _Linha = require('../Model/Linha');var _Linha2 = _interopRequireDefault(_Linha);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

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
            var linha = new _Linha2.default(this._linhas[0], this._layout, 'retorno');

            Object.keys(headerArquivoDef).forEach(function (campo) {
                _this2._model.headerArquivo[campo] = linha.obterValorCampo(headerArquivoDef[campo]);
            });
        } }, { key: '_decodeTrailerArquivo', value: function _decodeTrailerArquivo()

        {var _this3 = this;
            var layout = this._layout.getRetornoLayout();
            var trailerArquivoDef = layout['trailer_arquivo'];
            var linha = new _Linha2.default(this._linhas[this._linhas.length - 1], this._layout, 'retorno');

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
                var linha = new _Linha2.default(linhaStr, _this4._layout, 'retorno');
                var tipoRegistro = +linha.obterValorCampo(defTipoRegistro);

                if (tipoRegistro === _IntercambioBancarioRetornoFileAbstract2.default.REGISTRO_HEADER_ARQUIVO) {
                    return;
                }

                switch (tipoRegistro) {
                    case _IntercambioBancarioRetornoFileAbstract2.default.REGISTRO_HEADER_LOTE:
                        codigoLote = linha.obterValorCampo(defCodigoLote);
                        lote = {
                            codigoLote: codigoLote,
                            headerLote: _this4._model.decodeHeaderLote(linha),
                            trailerLote: _this4._model.decodeTrailerLote(linha),
                            titulos: [] };


                        break;

                    case _IntercambioBancarioRetornoFileAbstract2.default.REGISTRO_DETALHES:
                        var codigoSegmento = linha.obterValorCampo(defCodigoSegmento);
                        var dadosSegmento = linha.getDadosSegmento('segmento_' + codigoSegmento.toLowerCase());
                        segmentos[codigoSegmento] = dadosSegmento;
                        var proximaLinha = new _Linha2.default(_this4._linhas[index + 1], _this4._layout, 'retorno');
                        var proximoCodigoSegmento = proximaLinha.obterValorCampo(defCodigoSegmento);

                        if (codigoSegmento.toLowerCase() === ultimoCodigoSegmentoLayout.toLowerCase() ||
                        proximoCodigoSegmento.toLowerCase() === primeiroCodigoSegmentoLayout.toLowerCase()) {
                            if (!(Array.isArray(segmentos) && segmentos.length === 0)) {
                                lote['titulos'].push(segmentos);
                                segmentos = [];
                            }
                        }

                        break;

                    case _IntercambioBancarioRetornoFileAbstract2.default.REGISTRO_TRAILER_ARQUIVO:
                        _this4._model.lotes.push(lote);
                        titulos = [];
                        segmentos = {};

                        break;}

            });
        } }, { key: '_decodeLotesCNAB400', value: function _decodeLotesCNAB400()


        {var _this5 = this;
            var defTipoRegistro = { pos: [1, 1], picture: '9(1)' };
            var defCodigoSegmento = { pos: [1, 1], picture: '9(1)' };

            var lote = { titulos: [] };
            var segmentos = {};
            var primeiroCodigoSegmentoLayout = this._layout.getPrimeiroCodigoSegmentoRetorno().toString();
            var ultimoCodigoSegmentoLayout = this._layout.getUltimoCodigoSegmentoRetorno().toString();

            this._linhas.forEach(function (linhaStr, index) {
                var linha = new _Linha2.default(linhaStr, _this5._layout, 'retorno');
                var tipoRegistro = +linha.obterValorCampo(defTipoRegistro);

                if (tipoRegistro === _IntercambioBancarioRetornoFileAbstract2.default.REGISTRO_TRAILER_ARQUIVO) {
                    lote['titulos'].push(segmentos);
                    segmentos = [];
                } else if (tipoRegistro !== _IntercambioBancarioRetornoFileAbstract2.default.REGISTRO_HEADER_ARQUIVO) {
                    var codigoSegmento = linha.obterValorCampo(defCodigoSegmento).toString();
                    segmentos[codigoSegmento] = linha.getDadosSegmento('segmento_' + codigoSegmento.toLowerCase());
                    var proximaLinha = new _Linha2.default(_this5._linhas[index + 1], _this5._layout, 'retorno');
                    var proximoCodigoSegmento = proximaLinha.obterValorCampo(defCodigoSegmento).toString();

                    if (proximoCodigoSegmento.toLowerCase() === primeiroCodigoSegmentoLayout.toLowerCase() ||
                    codigoSegmento.toLowerCase() === ultimoCodigoSegmentoLayout.toLowerCase()) {
                        lote['titulos'].push(segmentos);
                        segmentos = [];
                    }


                }
            });

            this._model.lotes.push(lote);
        } }]);return RetornoFile;}(_IntercambioBancarioRetornoFileAbstract2.default);
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _HeaderArquivo = require('./Model/HeaderArquivo');var _HeaderArquivo2 = _interopRequireDefault(_HeaderArquivo);
var _TrailerArquivo = require('./Model/TrailerArquivo');var _TrailerArquivo2 = _interopRequireDefault(_TrailerArquivo);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

module.exports = function () {
    function IntercambioBancario(layout) {_classCallCheck(this, IntercambioBancario);
        this._layout = layout;
        this.header = new _HeaderArquivo2.default();
        this.trailer = new _TrailerArquivo2.default();
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
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}module.exports = function () {
    function IntercambioBancarioFileAbstract() {_classCallCheck(this, IntercambioBancarioFileAbstract);
        this._model = null;
    }_createClass(IntercambioBancarioFileAbstract, [{ key: 'generate', value: function generate(

        path) {
            throw new Error('You have to implement the method generate!');
        } }]);return IntercambioBancarioFileAbstract;}();
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _IntercambioBancarioFileAbstract = require('./IntercambioBancarioFileAbstract');var _IntercambioBancarioFileAbstract2 = _interopRequireDefault(_IntercambioBancarioFileAbstract);
var _Picture = require('./Format/Picture');var _Picture2 = _interopRequireDefault(_Picture);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

module.exports = function (_IntercambioBancarioF) {_inherits(IntercambioBancarioRemessaFileAbstract, _IntercambioBancarioF);
    function IntercambioBancarioRemessaFileAbstract(model) {_classCallCheck(this, IntercambioBancarioRemessaFileAbstract);var _this = _possibleConstructorReturn(this, (IntercambioBancarioRemessaFileAbstract.__proto__ || Object.getPrototypeOf(IntercambioBancarioRemessaFileAbstract)).call(this));


        _this._model = model;return _this;
    }_createClass(IntercambioBancarioRemessaFileAbstract, [{ key: '_encode', value: function _encode(

        fieldsDef, modelSection) {
            var encoded = '';

            Object.keys(fieldsDef).forEach(function (field) {
                if (modelSection[field] !== undefined) {
                    var format = fieldsDef[field]['picture'];
                    encoded += _Picture2.default.encode(modelSection[field], format, { fieldDesc: fieldsDef[field], field: field });
                }
            });

            return encoded;
        } }]);return IntercambioBancarioRemessaFileAbstract;}(_IntercambioBancarioFileAbstract2.default);
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _IntercambioBancarioFileAbstract = require('./IntercambioBancarioFileAbstract');var _IntercambioBancarioFileAbstract2 = _interopRequireDefault(_IntercambioBancarioFileAbstract);
var _Picture = require('./Format/Picture');var _Picture2 = _interopRequireDefault(_Picture);
var _Retorno = require('./Model/Retorno');var _Retorno2 = _interopRequireDefault(_Retorno);
var _Linha = require('./Model/Linha');var _Linha2 = _interopRequireDefault(_Linha);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

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
        _this._model = new _Retorno2.default();return _this;
    }_createClass(IntercambioBancarioRetornoFileAbstract, [{ key: '_calculaTotalLotes', value: function _calculaTotalLotes()

        {
            this._totalLotes = 1;
            var layout = this._layout.getLayout();
            var linhaTrailerArquivoStr = this._linhas[this._linhas.length - 1];

            var linha = new _Linha2.default(linhaTrailerArquivoStr, this._layout, 'retorno');

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
        } }]);return IntercambioBancarioRetornoFileAbstract;}(_IntercambioBancarioFileAbstract2.default);
"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}module.exports = function () {
    function BaseSerializable() {_classCallCheck(this, BaseSerializable);
        this._data = {};
    }_createClass(BaseSerializable, [{ key: "toJSON", value: function toJSON()

        {
            return this._data;
        } }, { key: "set", value: function set(

        name, value) {
            this._data[name] = value;
        } }, { key: "get", value: function get(

        name) {
            return this._data[name] || null;
        } }, { key: "includes", value: function includes(

        name) {
            return Object.keys(this._data).includes(name);
        } }, { key: "excludes", value: function excludes(

        name) {
            delete this._data[name];
        } }]);return BaseSerializable;}();
'use strict';var _BaseSerializable2 = require('./BaseSerializable');var _BaseSerializable3 = _interopRequireDefault(_BaseSerializable2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

module.exports = function (_BaseSerializable) {_inherits(HeaderArquivo, _BaseSerializable);function HeaderArquivo() {_classCallCheck(this, HeaderArquivo);return _possibleConstructorReturn(this, (HeaderArquivo.__proto__ || Object.getPrototypeOf(HeaderArquivo)).apply(this, arguments));}return HeaderArquivo;}(_BaseSerializable3.default);
'use strict';var _BaseSerializable2 = require('./BaseSerializable');var _BaseSerializable3 = _interopRequireDefault(_BaseSerializable2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

module.exports = function (_BaseSerializable) {_inherits(HeaderLote, _BaseSerializable);function HeaderLote() {_classCallCheck(this, HeaderLote);return _possibleConstructorReturn(this, (HeaderLote.__proto__ || Object.getPrototypeOf(HeaderLote)).apply(this, arguments));}return HeaderLote;}(_BaseSerializable3.default);
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Picture = require('../Format/Picture');var _Picture2 = _interopRequireDefault(_Picture);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

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

            if (tipo = _Picture2.default.REGEX_VALID_FORMAT.exec(definicao['picture'])) {
                var inicio = definicao['pos'][0] - 1;
                var tamanho = _Picture2.default.getLength(definicao['picture']);

                return _Picture2.default.decode(this.linhaStr.substr(inicio, tamanho), definicao['picture']);
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
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Picture = require('../Format/Picture');var _Picture2 = _interopRequireDefault(_Picture);
var _HeaderLote = require('./HeaderLote');var _HeaderLote2 = _interopRequireDefault(_HeaderLote);
var _TrailerLote = require('./TrailerLote');var _TrailerLote2 = _interopRequireDefault(_TrailerLote);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

module.exports = function () {
    function Lote() {var _this = this;var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var sequencial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;_classCallCheck(this, Lote);
        this.layout = layout;
        this.sequencial = sequencial;

        this.header = null;
        this.trailer = null;
        this.detalhes = [];

        if (this.layout['header_lote']) {
            this.header = new _HeaderLote2.default();
            Object.keys(this.layout['header_lote']).forEach(function (field) {
                _this.header.set(
                field,
                _this.layout['header_lote'][field]['default'] !== undefined ?
                _Picture2.default.encode(
                _this.layout['header_lote'][field]['default'],
                _this.layout['header_lote'][field]['picture']) :

                '');

            });
        }

        if (this.layout['trailer_lote']) {
            this.trailer = new _TrailerLote2.default();
            Object.keys(this.layout['trailer_lote']).forEach(function (field) {
                _this.trailer.set(
                field,
                _this.layout['trailer_lote'][field]['default'] !== undefined ?
                _Picture2.default.encode(
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
                        _Picture2.default.encode(
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
            var headerLote = this.header.toJSON();
            var trailerLote = this.trailer.toJSON();
            var detalhes = this.detalhes;

            return {
                codigo_lote: this.sequencial,
                header_lote: headerLote,
                detalhes: detalhes,
                trailer_lote: trailerLote };

        } }]);return Lote;}();
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Picture = require('../Format/Picture');var _Picture2 = _interopRequireDefault(_Picture);
var _IntercambioBancario2 = require('../IntercambioBancario');var _IntercambioBancario3 = _interopRequireDefault(_IntercambioBancario2);
var _Lote = require('./Lote');var _Lote2 = _interopRequireDefault(_Lote);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

module.exports = function (_IntercambioBancario) {_inherits(Remessa, _IntercambioBancario);
    function Remessa(layout) {_classCallCheck(this, Remessa);var _this = _possibleConstructorReturn(this, (Remessa.__proto__ || Object.getPrototypeOf(Remessa)).call(this,
        layout));

        var remessaLayout = _this._layout.getRemessaLayout();

        if (remessaLayout['header_arquivo']) {
            Object.keys(remessaLayout['header_arquivo']).forEach(function (field) {
                _this.header.set(
                field,
                remessaLayout['header_arquivo'][field]['default'] !== undefined ?
                _Picture2.default.encode(
                remessaLayout['header_arquivo'][field]['default'],
                remessaLayout['header_arquivo'][field]['picture'],
                { field: field }) :

                '');

            });
        }

        if (remessaLayout['trailer_arquivo']) {
            Object.keys(remessaLayout['trailer_arquivo']).forEach(function (field) {
                _this.trailer.set(
                field,
                remessaLayout['trailer_arquivo'][field]['default'] !== undefined ?
                _Picture2.default.encode(
                remessaLayout['trailer_arquivo'][field]['default'],
                remessaLayout['trailer_arquivo'][field]['picture'],
                { field: field }) :

                '');

            });
        }return _this;
    }_createClass(Remessa, [{ key: 'novoLote', value: function novoLote()

        {var sequencial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            return new _Lote2.default(this._layout.getRemessaLayout(), sequencial);
        } }]);return Remessa;}(_IntercambioBancario3.default);
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
'use strict';var _BaseSerializable2 = require('./BaseSerializable');var _BaseSerializable3 = _interopRequireDefault(_BaseSerializable2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

module.exports = function (_BaseSerializable) {_inherits(TrailerArquivo, _BaseSerializable);function TrailerArquivo() {_classCallCheck(this, TrailerArquivo);return _possibleConstructorReturn(this, (TrailerArquivo.__proto__ || Object.getPrototypeOf(TrailerArquivo)).apply(this, arguments));}return TrailerArquivo;}(_BaseSerializable3.default);
'use strict';var _BaseSerializable2 = require('./BaseSerializable');var _BaseSerializable3 = _interopRequireDefault(_BaseSerializable2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

module.exports = function (_BaseSerializable) {_inherits(TrailerLote, _BaseSerializable);function TrailerLote() {_classCallCheck(this, TrailerLote);return _possibleConstructorReturn(this, (TrailerLote.__proto__ || Object.getPrototypeOf(TrailerLote)).apply(this, arguments));}return TrailerLote;}(_BaseSerializable3.default);
'use strict';var _Layout = require('./Parser/Layout');var _Layout2 = _interopRequireDefault(_Layout);
var _Remessa = require('./Model/Remessa');var _Remessa2 = _interopRequireDefault(_Remessa);
var _RemessaFile = require('./Output/RemessaFile');var _RemessaFile2 = _interopRequireDefault(_RemessaFile);
var _RetornoFile = require('./Input/RetornoFile');var _RetornoFile2 = _interopRequireDefault(_RetornoFile);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

module.exports = {
    Layout: _Layout2.default,
    Remessa: _Remessa2.default,
    RemessaFile: _RemessaFile2.default,
    RetornoFile: _RetornoFile2.default };
'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _IntercambioBancarioRemessaFileAbstract = require('../IntercambioBancarioRemessaFileAbstract');var _IntercambioBancarioRemessaFileAbstract2 = _interopRequireDefault(_IntercambioBancarioRemessaFileAbstract);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

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
        } }], [{ key: 'CNAB_EOL', get: function get() {return '\r\n';} }]);return RemessaFile;}(_IntercambioBancarioRemessaFileAbstract2.default);
'use strict';var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

module.exports = function () {
    function Layout(banco) {var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '240';var arquivo = arguments[2];var _ref = arguments[3];var _ref$layoutPath = _ref.layoutPath,layoutPath = _ref$layoutPath === undefined ? '../../layouts' : _ref$layoutPath,_ref$loadFromFile = _ref.loadFromFile,loadFromFile = _ref$loadFromFile === undefined ? true : _ref$loadFromFile;_classCallCheck(this, Layout);
        this._arquivo = arquivo;
        if (loadFromFile) {
            this._config = require(_path2.default.resolve(layoutPath + '/' + banco + '/' + layout + '/' + arquivo + '.json'));
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
