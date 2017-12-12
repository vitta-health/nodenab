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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9JbnB1dC9SZXRvcm5vRmlsZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicGF0aCIsIl9kZWNvZGVIZWFkZXJBcnF1aXZvIiwiX2RlY29kZVRyYWlsZXJBcnF1aXZvIiwiX2RlY29kZUxvdGVzIiwiX21vZGVsIiwibGF5b3V0IiwiX2xheW91dCIsImdldFJldG9ybm9MYXlvdXQiLCJoZWFkZXJBcnF1aXZvRGVmIiwibGluaGEiLCJfbGluaGFzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJjYW1wbyIsImhlYWRlckFycXVpdm8iLCJvYnRlclZhbG9yQ2FtcG8iLCJ0cmFpbGVyQXJxdWl2b0RlZiIsImxlbmd0aCIsInRyYWlsZXJBcnF1aXZvIiwidGlwb0xheW91dCIsImdldExheW91dCIsIl9kZWNvZGVMb3Rlc0NOQUIyNDAiLCJfZGVjb2RlTG90ZXNDTkFCNDAwIiwiZGVmVGlwb1JlZ2lzdHJvIiwicG9zIiwicGljdHVyZSIsImRlZkNvZGlnb0xvdGUiLCJkZWZDb2RpZ29TZWdtZW50byIsImNvZGlnb0xvdGUiLCJsb3RlIiwidGl0dWxvcyIsInNlZ21lbnRvcyIsInByaW1laXJvQ29kaWdvU2VnbWVudG9MYXlvdXQiLCJnZXRQcmltZWlyb0NvZGlnb1NlZ21lbnRvUmV0b3JubyIsInVsdGltb0NvZGlnb1NlZ21lbnRvTGF5b3V0IiwiZ2V0VWx0aW1vQ29kaWdvU2VnbWVudG9SZXRvcm5vIiwibGluaGFTdHIiLCJpbmRleCIsInRpcG9SZWdpc3RybyIsIlJFR0lTVFJPX0hFQURFUl9BUlFVSVZPIiwiUkVHSVNUUk9fSEVBREVSX0xPVEUiLCJoZWFkZXJMb3RlIiwiZGVjb2RlSGVhZGVyTG90ZSIsInRyYWlsZXJMb3RlIiwiZGVjb2RlVHJhaWxlckxvdGUiLCJSRUdJU1RST19ERVRBTEhFUyIsImNvZGlnb1NlZ21lbnRvIiwiZGFkb3NTZWdtZW50byIsImdldERhZG9zU2VnbWVudG8iLCJ0b0xvd2VyQ2FzZSIsInByb3hpbWFMaW5oYSIsInByb3hpbW9Db2RpZ29TZWdtZW50byIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJSRUdJU1RST19UUkFJTEVSX0FSUVVJVk8iLCJsb3RlcyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoia2pCQUFBLG1HO0FBQ0EsdUM7O0FBRUFBLE9BQU9DLE9BQVA7QUFDMEIsYUFBYkMsSUFBYSx1RUFBTixJQUFNO0FBQ2xCLGlCQUFLQyxvQkFBTDtBQUNBLGlCQUFLQyxxQkFBTDtBQUNBLGlCQUFLQyxZQUFMOztBQUVBLG1CQUFPLEtBQUtDLE1BQVo7QUFDSCxTQVBMOztBQVMyQjtBQUNuQixnQkFBTUMsU0FBUyxLQUFLQyxPQUFMLENBQWFDLGdCQUFiLEVBQWY7QUFDQSxnQkFBTUMsbUJBQW1CSCxPQUFPLGdCQUFQLENBQXpCO0FBQ0EsZ0JBQUlJLFFBQVEsb0JBQVUsS0FBS0MsT0FBTCxDQUFhLENBQWIsQ0FBVixFQUEyQixLQUFLSixPQUFoQyxFQUF5QyxTQUF6QyxDQUFaOztBQUVBSyxtQkFBT0MsSUFBUCxDQUFZSixnQkFBWixFQUE4QkssT0FBOUIsQ0FBc0MsVUFBQ0MsS0FBRCxFQUFXO0FBQzdDLHVCQUFLVixNQUFMLENBQVlXLGFBQVosQ0FBMEJELEtBQTFCLElBQW1DTCxNQUFNTyxlQUFOLENBQXNCUixpQkFBaUJNLEtBQWpCLENBQXRCLENBQW5DO0FBQ0gsYUFGRDtBQUdILFNBakJMOztBQW1CNEI7QUFDcEIsZ0JBQU1ULFNBQVMsS0FBS0MsT0FBTCxDQUFhQyxnQkFBYixFQUFmO0FBQ0EsZ0JBQU1VLG9CQUFvQlosT0FBTyxpQkFBUCxDQUExQjtBQUNBLGdCQUFJSSxRQUFRLG9CQUFVLEtBQUtDLE9BQUwsQ0FBYSxLQUFLQSxPQUFMLENBQWFRLE1BQWIsR0FBc0IsQ0FBbkMsQ0FBVixFQUFpRCxLQUFLWixPQUF0RCxFQUErRCxTQUEvRCxDQUFaOztBQUVBSyxtQkFBT0MsSUFBUCxDQUFZSyxpQkFBWixFQUErQkosT0FBL0IsQ0FBdUMsVUFBQ0MsS0FBRCxFQUFXO0FBQzlD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QU4sQ0FBc0JZLGlCQUF0QixFQUF5QzhCLFFBQXpDLEVBQXJCO0FBQ0ExQiw4QkFBVWUsY0FBVixJQUE0QnRDLE1BQU13QyxnQkFBTixlQUFtQ0YsZUFBZUcsV0FBZixFQUFuQyxDQUE1QjtBQUNBLHdCQUFJQyxlQUFlLG9CQUFVLE9BQUt6QyxPQUFMLENBQWE0QixRQUFRLENBQXJCLENBQVYsRUFBbUMsT0FBS2hDLE9BQXhDLEVBQWlELFNBQWpELENBQW5CO0FBQ0Esd0JBQUk4Qyx3QkFBd0JELGFBQWFuQyxlQUFiLENBQTZCWSxpQkFBN0IsRUFBZ0Q4QixRQUFoRCxFQUE1Qjs7QUFFQSx3QkFBSU4sc0JBQXNCRixXQUF0QixPQUF3Q2pCLDZCQUE2QmlCLFdBQTdCLEVBQXhDO0FBQ0FILG1DQUFlRyxXQUFmLE9BQWlDZiwyQkFBMkJlLFdBQTNCLEVBRHJDLEVBQytFO0FBQzNFcEIsNkJBQUssU0FBTCxFQUFnQnlCLElBQWhCLENBQXFCdkIsU0FBckI7QUFDQUEsb0NBQVksRUFBWjtBQUNIOzs7QUFHSjtBQUNILGFBckJEOztBQXVCQSxpQkFBSzVCLE1BQUwsQ0FBWXFELEtBQVosQ0FBa0JGLElBQWxCLENBQXVCekIsSUFBdkI7QUFDSCxTQXJJTCIsImZpbGUiOiJSZXRvcm5vRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnRlcmNhbWJpb0JhbmNhcmlvUmV0b3Jub0ZpbGVBYnN0cmFjdCBmcm9tICcuLi9JbnRlcmNhbWJpb0JhbmNhcmlvUmV0b3Jub0ZpbGVBYnN0cmFjdCc7XG5pbXBvcnQgTGluaGEgZnJvbSAnLi4vTW9kZWwvTGluaGEnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFJldG9ybm9GaWxlIGV4dGVuZHMgSW50ZXJjYW1iaW9CYW5jYXJpb1JldG9ybm9GaWxlQWJzdHJhY3R7XG4gICAgZ2VuZXJhdGUocGF0aCA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fZGVjb2RlSGVhZGVyQXJxdWl2bygpO1xuICAgICAgICB0aGlzLl9kZWNvZGVUcmFpbGVyQXJxdWl2bygpO1xuICAgICAgICB0aGlzLl9kZWNvZGVMb3RlcygpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgICB9XG5cbiAgICBfZGVjb2RlSGVhZGVyQXJxdWl2bygpIHtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fbGF5b3V0LmdldFJldG9ybm9MYXlvdXQoKTtcbiAgICAgICAgY29uc3QgaGVhZGVyQXJxdWl2b0RlZiA9IGxheW91dFsnaGVhZGVyX2FycXVpdm8nXTtcbiAgICAgICAgbGV0IGxpbmhhID0gbmV3IExpbmhhKHRoaXMuX2xpbmhhc1swXSwgdGhpcy5fbGF5b3V0LCAncmV0b3JubycpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGhlYWRlckFycXVpdm9EZWYpLmZvckVhY2goKGNhbXBvKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbC5oZWFkZXJBcnF1aXZvW2NhbXBvXSA9IGxpbmhhLm9idGVyVmFsb3JDYW1wbyhoZWFkZXJBcnF1aXZvRGVmW2NhbXBvXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9kZWNvZGVUcmFpbGVyQXJxdWl2bygpIHtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fbGF5b3V0LmdldFJldG9ybm9MYXlvdXQoKTtcbiAgICAgICAgY29uc3QgdHJhaWxlckFycXVpdm9EZWYgPSBsYXlvdXRbJ3RyYWlsZXJfYXJxdWl2byddO1xuICAgICAgICBsZXQgbGluaGEgPSBuZXcgTGluaGEodGhpcy5fbGluaGFzW3RoaXMuX2xpbmhhcy5sZW5ndGggLSAxXSwgdGhpcy5fbGF5b3V0LCAncmV0b3JubycpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRyYWlsZXJBcnF1aXZvRGVmKS5mb3JFYWNoKChjYW1wbykgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbW9kZWwudHJhaWxlckFycXVpdm9bY2FtcG9dID0gbGluaGEub2J0ZXJWYWxvckNhbXBvKHRyYWlsZXJBcnF1aXZvRGVmW2NhbXBvXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9kZWNvZGVMb3RlcygpIHtcbiAgICAgICAgY29uc3QgdGlwb0xheW91dCA9IHRoaXMuX2xheW91dC5nZXRMYXlvdXQoKTtcblxuICAgICAgICBpZiAodGlwb0xheW91dCA9PT0gJzI0MCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlY29kZUxvdGVzQ05BQjI0MCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRpcG9MYXlvdXQgPT09ICc0MDAnKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWNvZGVMb3Rlc0NOQUI0MDAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgX2RlY29kZUxvdGVzQ05BQjI0MCgpIHtcbiAgICAgICAgY29uc3QgZGVmVGlwb1JlZ2lzdHJvID0geyBwb3M6IFs4LCA4XSwgcGljdHVyZTogJzkoMSknIH07XG4gICAgICAgIGNvbnN0IGRlZkNvZGlnb0xvdGUgPSB7IHBvczogWzQsIDddLCBwaWN0dXJlOiAnOSg0KScgfTtcbiAgICAgICAgY29uc3QgZGVmQ29kaWdvU2VnbWVudG8gPSB7IHBvczogWzE0LCAxNF0sIHBpY3R1cmU6ICdYKDEpJyB9O1xuICAgICAgICBsZXQgY29kaWdvTG90ZSA9IG51bGw7XG4gICAgICAgIGxldCBsb3RlID0gbnVsbDtcbiAgICAgICAgbGV0IHRpdHVsb3MgPSBbXTtcbiAgICAgICAgbGV0IHNlZ21lbnRvcyA9IHt9O1xuICAgICAgICBsZXQgcHJpbWVpcm9Db2RpZ29TZWdtZW50b0xheW91dCA9IHRoaXMuX2xheW91dC5nZXRQcmltZWlyb0NvZGlnb1NlZ21lbnRvUmV0b3JubygpO1xuICAgICAgICBsZXQgdWx0aW1vQ29kaWdvU2VnbWVudG9MYXlvdXQgPSB0aGlzLl9sYXlvdXQuZ2V0VWx0aW1vQ29kaWdvU2VnbWVudG9SZXRvcm5vKCk7XG5cblxuICAgICAgICB0aGlzLl9saW5oYXMuZm9yRWFjaCgobGluaGFTdHIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgIGxldCBsaW5oYSA9IG5ldyBMaW5oYShsaW5oYVN0ciwgdGhpcy5fbGF5b3V0LCAncmV0b3JubycpO1xuICAgICAgICAgICBsZXQgdGlwb1JlZ2lzdHJvID0gKyhsaW5oYS5vYnRlclZhbG9yQ2FtcG8oZGVmVGlwb1JlZ2lzdHJvKSk7XG5cbiAgICAgICAgICAgaWYgKHRpcG9SZWdpc3RybyA9PT0gSW50ZXJjYW1iaW9CYW5jYXJpb1JldG9ybm9GaWxlQWJzdHJhY3QuUkVHSVNUUk9fSEVBREVSX0FSUVVJVk8pIHtcbiAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgfVxuXG4gICAgICAgICAgIHN3aXRjaCAodGlwb1JlZ2lzdHJvKSB7XG4gICAgICAgICAgICAgICBjYXNlIEludGVyY2FtYmlvQmFuY2FyaW9SZXRvcm5vRmlsZUFic3RyYWN0LlJFR0lTVFJPX0hFQURFUl9MT1RFOlxuICAgICAgICAgICAgICAgICAgIGNvZGlnb0xvdGUgPSBsaW5oYS5vYnRlclZhbG9yQ2FtcG8oZGVmQ29kaWdvTG90ZSk7XG4gICAgICAgICAgICAgICAgICAgbG90ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgY29kaWdvTG90ZSA6IGNvZGlnb0xvdGUsXG4gICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckxvdGUgOiB0aGlzLl9tb2RlbC5kZWNvZGVIZWFkZXJMb3RlKGxpbmhhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgdHJhaWxlckxvdGU6IHRoaXMuX21vZGVsLmRlY29kZVRyYWlsZXJMb3RlKGxpbmhhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgdGl0dWxvczogW10sXG4gICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICBjYXNlIEludGVyY2FtYmlvQmFuY2FyaW9SZXRvcm5vRmlsZUFic3RyYWN0LlJFR0lTVFJPX0RFVEFMSEVTOlxuICAgICAgICAgICAgICAgICAgIGxldCBjb2RpZ29TZWdtZW50byA9IGxpbmhhLm9idGVyVmFsb3JDYW1wbyhkZWZDb2RpZ29TZWdtZW50byk7XG4gICAgICAgICAgICAgICAgICAgbGV0IGRhZG9zU2VnbWVudG8gPSBsaW5oYS5nZXREYWRvc1NlZ21lbnRvKGBzZWdtZW50b18ke2NvZGlnb1NlZ21lbnRvLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgICAgICAgICAgICAgICAgc2VnbWVudG9zW2NvZGlnb1NlZ21lbnRvXSA9IGRhZG9zU2VnbWVudG87XG4gICAgICAgICAgICAgICAgICAgbGV0IHByb3hpbWFMaW5oYSA9IG5ldyBMaW5oYSh0aGlzLl9saW5oYXNbaW5kZXggKyAxXSwgdGhpcy5fbGF5b3V0LCAncmV0b3JubycpO1xuICAgICAgICAgICAgICAgICAgIGxldCBwcm94aW1vQ29kaWdvU2VnbWVudG8gPSBwcm94aW1hTGluaGEub2J0ZXJWYWxvckNhbXBvKGRlZkNvZGlnb1NlZ21lbnRvKTtcblxuICAgICAgICAgICAgICAgICAgIGlmIChjb2RpZ29TZWdtZW50by50b0xvd2VyQ2FzZSgpID09PSB1bHRpbW9Db2RpZ29TZWdtZW50b0xheW91dC50b0xvd2VyQ2FzZSgpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm94aW1vQ29kaWdvU2VnbWVudG8udG9Mb3dlckNhc2UoKSA9PT0gcHJpbWVpcm9Db2RpZ29TZWdtZW50b0xheW91dC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmICghKEFycmF5LmlzQXJyYXkoc2VnbWVudG9zKSAmJiBzZWdtZW50b3MubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgbG90ZVsndGl0dWxvcyddLnB1c2goc2VnbWVudG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRvcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgIGNhc2UgSW50ZXJjYW1iaW9CYW5jYXJpb1JldG9ybm9GaWxlQWJzdHJhY3QuUkVHSVNUUk9fVFJBSUxFUl9BUlFVSVZPOlxuICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGVsLmxvdGVzLnB1c2gobG90ZSk7XG4gICAgICAgICAgICAgICAgICAgdGl0dWxvcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgIHNlZ21lbnRvcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBfZGVjb2RlTG90ZXNDTkFCNDAwKCkge1xuICAgICAgICBjb25zdCBkZWZUaXBvUmVnaXN0cm8gPSB7IHBvczogWzEsIDFdLCBwaWN0dXJlOiAnOSgxKScgfTtcbiAgICAgICAgY29uc3QgZGVmQ29kaWdvU2VnbWVudG8gPSB7IHBvczogWzEsIDFdLCBwaWN0dXJlOiAnOSgxKScgfTtcblxuICAgICAgICBsZXQgbG90ZSA9IHsgdGl0dWxvczogW10gfTtcbiAgICAgICAgbGV0IHNlZ21lbnRvcyA9IHt9O1xuICAgICAgICBsZXQgcHJpbWVpcm9Db2RpZ29TZWdtZW50b0xheW91dCA9IHRoaXMuX2xheW91dC5nZXRQcmltZWlyb0NvZGlnb1NlZ21lbnRvUmV0b3JubygpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCB1bHRpbW9Db2RpZ29TZWdtZW50b0xheW91dCA9IHRoaXMuX2xheW91dC5nZXRVbHRpbW9Db2RpZ29TZWdtZW50b1JldG9ybm8oKS50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuX2xpbmhhcy5mb3JFYWNoKChsaW5oYVN0ciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgbGV0IGxpbmhhID0gbmV3IExpbmhhKGxpbmhhU3RyLCB0aGlzLl9sYXlvdXQsICdyZXRvcm5vJyk7XG4gICAgICAgICAgIGxldCB0aXBvUmVnaXN0cm8gPSArKGxpbmhhLm9idGVyVmFsb3JDYW1wbyhkZWZUaXBvUmVnaXN0cm8pKTtcblxuICAgICAgICAgICBpZiAodGlwb1JlZ2lzdHJvID09PSBJbnRlcmNhbWJpb0JhbmNhcmlvUmV0b3Jub0ZpbGVBYnN0cmFjdC5SRUdJU1RST19UUkFJTEVSX0FSUVVJVk8pIHtcbiAgICAgICAgICAgICAgIGxvdGVbJ3RpdHVsb3MnXS5wdXNoKHNlZ21lbnRvcyk7XG4gICAgICAgICAgICAgICBzZWdtZW50b3MgPSBbXTtcbiAgICAgICAgICAgfSBlbHNlIGlmICh0aXBvUmVnaXN0cm8gIT09IEludGVyY2FtYmlvQmFuY2FyaW9SZXRvcm5vRmlsZUFic3RyYWN0LlJFR0lTVFJPX0hFQURFUl9BUlFVSVZPKSB7XG4gICAgICAgICAgICAgICBsZXQgY29kaWdvU2VnbWVudG8gPSBsaW5oYS5vYnRlclZhbG9yQ2FtcG8oZGVmQ29kaWdvU2VnbWVudG8pLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICBzZWdtZW50b3NbY29kaWdvU2VnbWVudG9dID0gbGluaGEuZ2V0RGFkb3NTZWdtZW50byhgc2VnbWVudG9fJHtjb2RpZ29TZWdtZW50by50b0xvd2VyQ2FzZSgpfWApO1xuICAgICAgICAgICAgICAgbGV0IHByb3hpbWFMaW5oYSA9IG5ldyBMaW5oYSh0aGlzLl9saW5oYXNbaW5kZXggKyAxXSwgdGhpcy5fbGF5b3V0LCAncmV0b3JubycpO1xuICAgICAgICAgICAgICAgbGV0IHByb3hpbW9Db2RpZ29TZWdtZW50byA9IHByb3hpbWFMaW5oYS5vYnRlclZhbG9yQ2FtcG8oZGVmQ29kaWdvU2VnbWVudG8pLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgIGlmIChwcm94aW1vQ29kaWdvU2VnbWVudG8udG9Mb3dlckNhc2UoKSA9PT0gcHJpbWVpcm9Db2RpZ29TZWdtZW50b0xheW91dC50b0xvd2VyQ2FzZSgpIHx8XG4gICAgICAgICAgICAgICAgICAgY29kaWdvU2VnbWVudG8udG9Mb3dlckNhc2UoKSA9PT0gdWx0aW1vQ29kaWdvU2VnbWVudG9MYXlvdXQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgIGxvdGVbJ3RpdHVsb3MnXS5wdXNoKHNlZ21lbnRvcyk7XG4gICAgICAgICAgICAgICAgICAgc2VnbWVudG9zID0gW107XG4gICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX21vZGVsLmxvdGVzLnB1c2gobG90ZSk7XG4gICAgfVxufTsiXX0=