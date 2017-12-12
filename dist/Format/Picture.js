'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _moment = require('/Users/gilsonsouza/Projects/Nodenab/node_modules/moment');var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

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
                            numericValue = (0, _moment2.default)(value).format(options.dateFormat);
                        } else {
                            if (+(matches[2] || 0) === 8) {
                                numericValue = (0, _moment2.default)(value).format('DDMMYYYY');
                            }
                            if (+(matches[2] || 0) === 6) {
                                numericValue = (0, _moment2.default)(value).format('DDMMYY');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Gb3JtYXQvUGljdHVyZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidmFsdWUiLCJtYXRjaCIsImZvcm1hdCIsIlBpY3R1cmUiLCJSRUdFWF9WQUxJRF9GT1JNQVQiLCJsZW5ndGgiLCJsZW5ndGhNYXRjaGVzIiwiZXhlYyIsIkVycm9yIiwicmVwbGFjZSIsIm9wdGlvbnMiLCJtYXRjaGVzIiwic3Vic3RyIiwicGFkRW5kIiwibnVtZXJpY1ZhbHVlIiwiX3ZhbGlkYXJEYXRhIiwiZGF0ZUZvcm1hdCIsImlzTmFOIiwicGFyc2VOdW1iZXIiLCJudW1lcmljRXhwcmVzc2lvbiIsInNwbGl0IiwidW5kZWZpbmVkIiwidGFtYW5ob0xlZnQiLCJ0YW1hbmhvUmlndGgiLCJ2YWxvckxlZnQiLCJwYWRTdGFydCIsImV4dHJhIiwiZXh0cmFQb3ciLCJNYXRoIiwicG93Iiwicm91bmQiLCJ2YWxvclJpZ3RoIl0sIm1hcHBpbmdzIjoia2pCQUFBLGlGOztBQUVBQSxPQUFPQyxPQUFQOzs7Ozs7QUFNd0JDLGFBTnhCLEVBTStCO0FBQ3ZCLG1CQUFPLE1BQUdBLEtBQUgsRUFBV0MsS0FBWCxDQUFpQixxQkFBakIsTUFBNEMsSUFBbkQ7QUFDSDs7QUFFRDs7OzthQVZKO0FBZTBCQyxjQWYxQixFQWVrQztBQUMxQixtQkFBT0EsT0FBT0QsS0FBUCxDQUFhRSxRQUFRQyxrQkFBckIsRUFBeUNDLE1BQXpDLElBQW1ELENBQTFEO0FBQ0g7O0FBRUQ7Ozs7YUFuQko7QUF3QnFCSCxjQXhCckIsRUF3QjZCO0FBQ3JCLGdCQUFJSSxzQkFBSjs7QUFFQSxnQkFBSUEsZ0JBQWdCSCxRQUFRQyxrQkFBUixDQUEyQkcsSUFBM0IsQ0FBZ0NMLE1BQWhDLENBQXBCLEVBQTZEO0FBQ3pELHVCQUFPLEVBQUVJLGNBQWMsQ0FBZCxLQUFvQixDQUF0QixJQUEyQixFQUFFQSxjQUFjLENBQWQsS0FBb0IsQ0FBdEIsQ0FBbEM7QUFDSCxhQUZELE1BRU87QUFDSCxz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Qi9CLE1BQU1ZLE1BQU4sQ0FBYVUsV0FBYixFQUEwQkMsWUFBMUIsQ0FBdEI7O0FBRUEsNEJBQUksQ0FBRVEsVUFBRixHQUFnQixDQUFwQixFQUF1QjtBQUNuQixtQ0FBTyxDQUFFUCxTQUFGLEdBQWVPLFVBQXRCO0FBQ0gseUJBRkQsTUFFTztBQUNILG1DQUFPLENBQUU1QixRQUFRZSxXQUFSLENBQW9CTSxTQUFwQixDQUFUO0FBQ0g7QUFDSixxQkFYRCxNQVdPLElBQUksQ0FBQ2IsUUFBUSxDQUFSLENBQUwsRUFBaUI7QUFDcEIsK0JBQU8sQ0FBRVIsUUFBUWUsV0FBUixDQUFvQmxCLEtBQXBCLENBQVQ7QUFDSCxxQkFGTSxNQUVBO0FBQ0gsOEJBQU0sSUFBSVEsS0FBSixtQkFBdUJOLE1BQXZCLHdDQUFOO0FBQ0g7QUFDSjtBQUNKLGFBckJELE1BcUJPO0FBQ0gsc0JBQU0sSUFBSU0sS0FBSixtQkFBdUJOLE1BQXZCLHdDQUFOO0FBQ0g7QUFDSixTQTVJTCxxREFDb0MsQ0FDNUIsT0FBTywwQ0FBUCxFQUVILENBSkwiLCJmaWxlIjoiUGljdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQaWN0dXJlIHtcbiAgICBzdGF0aWMgZ2V0IFJFR0VYX1ZBTElEX0ZPUk1BVCgpIHtcbiAgICAgICAgcmV0dXJuIC8oW1g5XSlcXCgoXFxkezAsfSlcXCkoKFY5KVxcKChcXGR7MCx9KVxcKT8pPy9nO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIF92YWxpZGFyRGF0YSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gYCR7dmFsdWV9YC5tYXRjaCgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8pICE9PSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYSBvIGZvcm1hdG8gZGUgdW0gY2FtcG8gZGUgYWNvcmRvIGNvbSBzdWEgcGljdHVyZVxuICAgICAqIEBwYXJhbSBmb3JtYXQge1N0cmluZ30gRm9ybWF0byBkbyBjYW1wb1xuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgc3RhdGljIHZhbGlkYXJGb3JtYXRvKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gZm9ybWF0Lm1hdGNoKFBpY3R1cmUuUkVHRVhfVkFMSURfRk9STUFUKS5sZW5ndGggPj0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRvcm5hIG8gdGFtYW5obyBkbyBjYW1wbyBkYWRvIHNldSBmb3JtYXRvXG4gICAgICogQHBhcmFtIGZvcm1hdCB7U3RyaW5nfSBGb3JtYXRvIGRvIGNhbXBvXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRMZW5ndGgoZm9ybWF0KSB7XG4gICAgICAgIGxldCBsZW5ndGhNYXRjaGVzO1xuXG4gICAgICAgIGlmIChsZW5ndGhNYXRjaGVzID0gUGljdHVyZS5SRUdFWF9WQUxJRF9GT1JNQVQuZXhlYyhmb3JtYXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gKyhsZW5ndGhNYXRjaGVzWzJdIHx8IDApICsgKyhsZW5ndGhNYXRjaGVzWzVdIHx8IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPIHBhZHLDo28gKCR7Zm9ybWF0fSkgbsOjbyDDqSB1bSBmb3JtYXRvIHbDoWxpZG9gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdGEgdW1hIHN0cmluZyBwYXJhIHJldG9ybmFyIHNvbWVudGUgbsO6bWVyb3NcbiAgICAgKiBAcGFyYW0gdmFsdWUge1N0cmluZ30gVmFsb3IgcGFyYSBmb3JtYXRhclxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VOdW1iZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGAke3ZhbHVlfWAucmVwbGFjZSgvW14wLTkuXS9nLCAnJykucmVwbGFjZSgvXjArL2csICcnKSB8fCAnMCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5jb2RhIHVtIHZhbG9yIGJhc2VhZG8gZW0gdW0gZm9ybWF0byBkZSBwaWN0dXJlIGRlIGNhbXBvXG4gICAgICogQHBhcmFtIHZhbHVlIHsqfSBWYWxvciBkZSBlbnRyYWRhIHBhcmEgbyBmb3JtYXRvXG4gICAgICogQHBhcmFtIGZvcm1hdCB7U3RyaW5nfSBGb3JtYXRvIGRvIGNhbXBvIGRvIHZhbG9yIGRlIGVudHJhZGFcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fSBPcMOnw7VlcyBhZGljaW9uYWlzIGRvIGNhbXBvXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZW5jb2RlKHZhbHVlLCBmb3JtYXQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBsZXQgbWF0Y2hlcztcblxuICAgICAgICBpZiAobWF0Y2hlcyA9IFBpY3R1cmUuUkVHRVhfVkFMSURfRk9STUFULmV4ZWMoZm9ybWF0KSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoZXNbMV0gPT09ICdYJyAmJiAhbWF0Y2hlc1s0XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHt2YWx1ZX1gLnN1YnN0cigwLCArKG1hdGNoZXNbMl0gfHwgMCkpLnBhZEVuZCgrKG1hdGNoZXNbMl0gfHwgMCksICcgJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZXNbMV0gPT09ICc5Jykge1xuICAgICAgICAgICAgICAgIGxldCBudW1lcmljVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoUGljdHVyZS5fdmFsaWRhckRhdGEodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWVyaWNWYWx1ZSA9IG1vbWVudCh2YWx1ZSkuZm9ybWF0KG9wdGlvbnMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKyhtYXRjaGVzWzJdIHx8IDApID09PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJpY1ZhbHVlID0gbW9tZW50KHZhbHVlKS5mb3JtYXQoJ0RETU1ZWVlZJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKyhtYXRjaGVzWzJdIHx8IDApID09PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJpY1ZhbHVlID0gbW9tZW50KHZhbHVlKS5mb3JtYXQoJ0RETU1ZWScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKCtudW1lcmljVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTyB2YWxvciAoJHtudW1lcmljVmFsdWV9KSBpbmZvcm1hZG8gZGV2ZSBzZXIgdW0gbsO6bWVybyBubyBmb3JtYXRvICR7Zm9ybWF0fWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG51bWVyaWNWYWx1ZSA9IFBpY3R1cmUucGFyc2VOdW1iZXIobnVtZXJpY1ZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtZXJpY0V4cHJlc3Npb24gPSBudW1lcmljVmFsdWUuc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgICAgIGlmIChudW1lcmljRXhwcmVzc2lvblsxXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bWVyaWNFeHByZXNzaW9uWzFdID0gJzAnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzWzRdID09PSAnVjknKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YW1hbmhvTGVmdCA9ICsobWF0Y2hlc1syXSB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhbWFuaG9SaWd0aCA9ICsobWF0Y2hlc1s1XSB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbG9yTGVmdCA9IG51bWVyaWNFeHByZXNzaW9uWzBdLnBhZFN0YXJ0KHRhbWFuaG9MZWZ0LCAnMCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1lcmljRXhwcmVzc2lvblsxXS5sZW5ndGggPiB0YW1hbmhvUmlndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHRyYSA9IG51bWVyaWNFeHByZXNzaW9uWzFdLmxlbmd0aCAtIHRhbWFuaG9SaWd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHRyYVBvdyA9IE1hdGgucG93KDEwLCBleHRyYSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWVyaWNFeHByZXNzaW9uWzFdID0gYCR7TWF0aC5yb3VuZChudW1lcmljRXhwcmVzc2lvblsxXSAvIGV4dHJhUG93KX1gO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbG9yUmlndGggPSBudW1lcmljRXhwcmVzc2lvblsxXS5wYWRFbmQodGFtYW5ob1JpZ3RoLCAnMCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt2YWxvckxlZnR9JHt2YWxvclJpZ3RofWBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFtYXRjaGVzWzRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQaWN0dXJlLnBhcnNlTnVtYmVyKG51bWVyaWNWYWx1ZSkucGFkU3RhcnQoKyhtYXRjaGVzWzJdIHx8IDApLCAnMCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTyBwYWRyw6NvICgke2Zvcm1hdH0pIG7Do28gw6kgdW0gZm9ybWF0byB2w6FsaWRvYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVjb2RhIHVtIHZhbG9yIGJhc2VhZG8gZW0gdW0gZm9ybWF0byBkZSBwaWN0dXJlIGRlIGNhbXBvXG4gICAgICogQHBhcmFtIHZhbHVlIHsqfSBWYWxvciBkZSBlbnRyYWRhIHBhcmEgbyBkZWNvZGVcbiAgICAgKiBAcGFyYW0gZm9ybWF0IHtTdHJpbmd9IEZvcm1hdG8gZG8gY2FtcG8gZG8gdmFsb3IgZGUgZW50cmFkYVxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IE9ww6fDtWVzIGFkaWNpb25haXMgZG8gY2FtcG9cbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqL1xuICAgIHN0YXRpYyBkZWNvZGUodmFsdWUsIGZvcm1hdCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCBtYXRjaGVzO1xuXG4gICAgICAgIGlmIChtYXRjaGVzID0gUGljdHVyZS5SRUdFWF9WQUxJRF9GT1JNQVQuZXhlYyhmb3JtYXQpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hlc1sxXSA9PT0gJ1gnICYmICFtYXRjaGVzWzRdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcc3sxLH0kL2csICcnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlc1sxXSA9PT0gJzknKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNbNF0gPT09ICdWOScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhbWFuaG9MZWZ0ID0gKyhtYXRjaGVzWzJdIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFtYW5ob1JpZ3RoID0gKyhtYXRjaGVzWzVdIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsb3JMZWZ0ID0gUGljdHVyZS5wYXJzZU51bWJlcih2YWx1ZS5zdWJzdHIoMCwgdGFtYW5ob0xlZnQpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbG9yUmlndGggPSBgMC4ke3ZhbHVlLnN1YnN0cih0YW1hbmhvTGVmdCwgdGFtYW5ob1JpZ3RoKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgrKHZhbG9yUmlndGgpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICsodmFsb3JMZWZ0KSArKHZhbG9yUmlndGgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICsoUGljdHVyZS5wYXJzZU51bWJlcih2YWxvckxlZnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW1hdGNoZXNbNF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICsoUGljdHVyZS5wYXJzZU51bWJlcih2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTyBwYWRyw6NvICgke2Zvcm1hdH0pIG7Do28gw6kgdW0gZm9ybWF0byB2w6FsaWRvYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPIHBhZHLDo28gKCR7Zm9ybWF0fSkgbsOjbyDDqSB1bSBmb3JtYXRvIHbDoWxpZG9gKTtcbiAgICAgICAgfVxuICAgIH1cbn07Il19