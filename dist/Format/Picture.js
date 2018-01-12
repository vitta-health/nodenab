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
                    return ('' + value).
                    normalize('NFD').
                    replace(/[\u0300-\u036f]/g, "").
                    substr(0, +(matches[2] || 0)).
                    padEnd(+(matches[2] || 0), ' ').
                    toUpperCase();
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
                        throw new Error('O valor (' + numericValue + ') do campo ' + options.field + ' informado deve ser um n\xFAmero no formato ' + format);
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