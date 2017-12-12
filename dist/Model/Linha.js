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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbC9MaW5oYS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibGluaGFTdHIiLCJsYXlvdXQiLCJ0aXBvIiwidG9Mb3dlckNhc2UiLCJzZWdtZW50b0tleSIsImdldFJlbWVzc2FMYXlvdXQiLCJnZXRSZXRvcm5vTGF5b3V0IiwidW5kZWZpbmVkIiwiRXJyb3IiLCJjYW1wb3MiLCJkYWRvcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibm9tZSIsIm9idGVyVmFsb3JDYW1wbyIsImRlZmluaWNhbyIsIlJFR0VYX1ZBTElEX0ZPUk1BVCIsImV4ZWMiLCJpbmljaW8iLCJ0YW1hbmhvIiwiZ2V0TGVuZ3RoIiwiZGVjb2RlIiwic3Vic3RyIiwiZm9ybWF0Il0sIm1hcHBpbmdzIjoia2pCQUFBLDRDOztBQUVBQSxPQUFPQyxPQUFQO0FBQ0ksbUJBQVlDLFFBQVosRUFBc0JDLE1BQXRCLEVBQWdELEtBQWxCQyxJQUFrQix1RUFBWCxTQUFXO0FBQzVDLGFBQUtGLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsYUFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsYUFBS0MsSUFBTCxHQUFZQSxLQUFLQyxXQUFMLEVBQVo7QUFDSCxLQUxMOztBQU9xQkMsbUJBUHJCLEVBT2tDO0FBQzFCLGdCQUFNSCxTQUFVLEtBQUtDLElBQUwsS0FBYyxTQUFmO0FBQ1gsaUJBQUtELE1BQUwsQ0FBWUksZ0JBQVosRUFEVztBQUVYLGlCQUFLSixNQUFMLENBQVlLLGdCQUFaLEVBRko7O0FBSUEsZ0JBQUlMLE9BQU8sVUFBUCxFQUFtQkcsV0FBbkIsTUFBb0NHLFNBQXhDLEVBQW1EO0FBQy9DLHNCQUFNLElBQUlDLEtBQUosb0NBQTJDSixXQUEzQywyRUFBTjtBQUNIOztBQUVELGdCQUFNSyxTQUFTUixPQUFPLFVBQVAsRUFBbUJHLFdBQW5CLENBQWY7QUFDQSxnQkFBSU0sUUFBUSxFQUFaOztBQUVBQyxtQkFBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9CSSxPQUFwQixDQUE0QixVQUFDQyxJQUFELEVBQVU7QUFDbkNKLHNCQUFNSSxJQUFOLElBQWMsTUFBS0MsZUFBTCxDQUFxQk4sT0FBT0ssSUFBUCxDQUFyQixDQUFkO0FBQ0YsYUFGRDs7QUFJQSxtQkFBT0osS0FBUDtBQUNILFNBeEJMOztBQTBCb0JNLGlCQTFCcEIsRUEwQitCO0FBQ3ZCLGdCQUFJZCxhQUFKOztBQUVBLGdCQUFJQSxPQUFPLGtCQUFRZSxrQkFBUixDQUEyQkMsSUFBM0IsQ0FBZ0NGLFVBQVUsU0FBVixDQUFoQyxDQUFYLEVBQWtFO0FBQzlELG9CQUFNRyxTQUFTSCxVQUFVLEtBQVYsRUFBaUIsQ0FBakIsSUFBc0IsQ0FBckM7QUFDQSxvQkFBTUksVUFBVSxrQkFBUUMsU0FBUixDQUFrQkwsVUFBVSxTQUFWLENBQWxCLENBQWhCOztBQUVBLHVCQUFPLGtCQUFRTSxNQUFSLENBQWUsS0FBS3RCLFFBQUwsQ0FBY3VCLE1BQWQsQ0FBcUJKLE1BQXJCLEVBQTZCQyxPQUE3QixDQUFmLEVBQXNESixVQUFVLFNBQVYsQ0FBdEQsQ0FBUDtBQUNILGFBTEQsTUFLTztBQUNILHNCQUFNLElBQUlSLEtBQUosaURBQXFEZ0IsTUFBckQsd0NBQU47QUFDSDtBQUNKLFNBckNMOztBQXVDZ0I7QUFDUixtQkFBTyxLQUFLdkIsTUFBWjtBQUNILFNBekNMOztBQTJDYztBQUNOLG1CQUFPLEtBQUtDLElBQVo7QUFDSCxTQTdDTCIsImZpbGUiOiJMaW5oYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaWN0dXJlIGZyb20gJy4uL0Zvcm1hdC9QaWN0dXJlJztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBMaW5oYSB7XG4gICAgY29uc3RydWN0b3IobGluaGFTdHIsIGxheW91dCwgdGlwbyA9ICdyZW1lc3NhJykge1xuICAgICAgICB0aGlzLmxpbmhhU3RyID0gbGluaGFTdHI7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICB0aGlzLnRpcG8gPSB0aXBvLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0RGFkb3NTZWdtZW50byhzZWdtZW50b0tleSkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy50aXBvID09PSAncmVtZXNzYScpID9cbiAgICAgICAgICAgIHRoaXMubGF5b3V0LmdldFJlbWVzc2FMYXlvdXQoKSA6XG4gICAgICAgICAgICB0aGlzLmxheW91dC5nZXRSZXRvcm5vTGF5b3V0KCk7XG5cbiAgICAgICAgaWYgKGxheW91dFsnZGV0YWxoZXMnXVtzZWdtZW50b0tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIGFvIHByb2Nlc3NhciBvIHNlZ3VtZW50byAke3NlZ21lbnRvS2V5fS4gTsOjbyBmb2kgcG9zc8OtdmVsIGlkZW50aWZpY2FyIHVtIGxheW91dCB2w6FsaWRvIHBhcmEgbyBtZXNtb2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2FtcG9zID0gbGF5b3V0WydkZXRhbGhlcyddW3NlZ21lbnRvS2V5XTtcbiAgICAgICAgbGV0IGRhZG9zID0ge307XG5cbiAgICAgICAgT2JqZWN0LmtleXMoY2FtcG9zKS5mb3JFYWNoKChub21lKSA9PiB7XG4gICAgICAgICAgIGRhZG9zW25vbWVdID0gdGhpcy5vYnRlclZhbG9yQ2FtcG8oY2FtcG9zW25vbWVdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRhZG9zO1xuICAgIH1cblxuICAgIG9idGVyVmFsb3JDYW1wbyhkZWZpbmljYW8pIHtcbiAgICAgICAgbGV0IHRpcG87XG5cbiAgICAgICAgaWYgKHRpcG8gPSBQaWN0dXJlLlJFR0VYX1ZBTElEX0ZPUk1BVC5leGVjKGRlZmluaWNhb1sncGljdHVyZSddKSkge1xuICAgICAgICAgICAgY29uc3QgaW5pY2lvID0gZGVmaW5pY2FvWydwb3MnXVswXSAtIDE7XG4gICAgICAgICAgICBjb25zdCB0YW1hbmhvID0gUGljdHVyZS5nZXRMZW5ndGgoZGVmaW5pY2FvWydwaWN0dXJlJ10pO1xuXG4gICAgICAgICAgICByZXR1cm4gUGljdHVyZS5kZWNvZGUodGhpcy5saW5oYVN0ci5zdWJzdHIoaW5pY2lvLCB0YW1hbmhvKSwgZGVmaW5pY2FvWydwaWN0dXJlJ10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIGFvIG9idGVyIHZhbG9yIGRlIGNhbXBvLiBPIHBhZHLDo28gKCR7Zm9ybWF0fSkgbsOjbyDDqSB1bSBmb3JtYXRvIHbDoWxpZG9gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExheW91dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0O1xuICAgIH1cblxuICAgIGdldFRpcG8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpcG87XG4gICAgfVxufTsiXX0=