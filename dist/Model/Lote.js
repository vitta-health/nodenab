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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbC9Mb3RlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJsYXlvdXQiLCJzZXF1ZW5jaWFsIiwiaGVhZGVyIiwidHJhaWxlciIsImRldGFsaGVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJmaWVsZCIsInNldCIsInVuZGVmaW5lZCIsImVuY29kZSIsImV4Y2V0b1NlZ21lbnRvcyIsImRldGFsaGUiLCJzZWdtZW50byIsImluY2x1ZGVzIiwicHVzaCIsImxlbmd0aCIsImhlYWRlckxvdGUiLCJ0b0pTT04iLCJ0cmFpbGVyTG90ZSIsImNvZGlnb19sb3RlIiwiaGVhZGVyX2xvdGUiLCJ0cmFpbGVyX2xvdGUiXSwibWFwcGluZ3MiOiJrakJBQUEsNEM7QUFDQSwwQztBQUNBLDRDOztBQUVBQSxPQUFPQyxPQUFQO0FBQ0ksb0JBQXlDLHNCQUE3QkMsTUFBNkIsdUVBQXBCLEVBQW9CLEtBQWhCQyxVQUFnQix1RUFBSCxDQUFHO0FBQ3JDLGFBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLFVBQUwsR0FBa0JBLFVBQWxCOztBQUVBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLEVBQWhCOztBQUVBLFlBQUksS0FBS0osTUFBTCxDQUFZLGFBQVosQ0FBSixFQUFnQztBQUM1QixpQkFBS0UsTUFBTCxHQUFjLDBCQUFkO0FBQ0FHLG1CQUFPQyxJQUFQLENBQVksS0FBS04sTUFBTCxDQUFZLGFBQVosQ0FBWixFQUF3Q08sT0FBeEMsQ0FBZ0QsVUFBQ0MsS0FBRCxFQUFXO0FBQ3ZELHNCQUFLTixNQUFMLENBQVlPLEdBQVo7QUFDSUQscUJBREo7QUFFSyxzQkFBS1IsTUFBTCxDQUFZLGFBQVosRUFBMkJRLEtBQTNCLEVBQWtDLFNBQWxDLE1BQWlERSxTQUFsRDtBQUNJLGtDQUFRQyxNQUFSO0FBQ0ksc0JBQUtYLE1BQUwsQ0FBWSxhQUFa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ImltcG9ydCBQaWN0dXJlIGZyb20gJy4uL0Zvcm1hdC9QaWN0dXJlJztcbmltcG9ydCBIZWFkZXJMb3RlIGZyb20gJy4vSGVhZGVyTG90ZSc7XG5pbXBvcnQgVHJhaWxlckxvdGUgZnJvbSAnLi9UcmFpbGVyTG90ZSc7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTG90ZSB7XG4gICAgY29uc3RydWN0b3IobGF5b3V0ID0ge30sIHNlcXVlbmNpYWwgPSAxKSB7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICB0aGlzLnNlcXVlbmNpYWwgPSBzZXF1ZW5jaWFsO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy50cmFpbGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZXRhbGhlcyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLmxheW91dFsnaGVhZGVyX2xvdGUnXSkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBuZXcgSGVhZGVyTG90ZSgpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5sYXlvdXRbJ2hlYWRlcl9sb3RlJ10pLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkZXIuc2V0KFxuICAgICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMubGF5b3V0WydoZWFkZXJfbG90ZSddW2ZpZWxkXVsnZGVmYXVsdCddICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFBpY3R1cmUuZW5jb2RlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0WydoZWFkZXJfbG90ZSddW2ZpZWxkXVsnZGVmYXVsdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0WydoZWFkZXJfbG90ZSddW2ZpZWxkXVsncGljdHVyZSddXG4gICAgICAgICAgICAgICAgICAgICAgICApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXlvdXRbJ3RyYWlsZXJfbG90ZSddKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWlsZXIgPSBuZXcgVHJhaWxlckxvdGUoKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGF5b3V0Wyd0cmFpbGVyX2xvdGUnXSkuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWlsZXIuc2V0KFxuICAgICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMubGF5b3V0Wyd0cmFpbGVyX2xvdGUnXVtmaWVsZF1bJ2RlZmF1bHQnXSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBQaWN0dXJlLmVuY29kZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFsndHJhaWxlcl9sb3RlJ11bZmllbGRdWydkZWZhdWx0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRbJ3RyYWlsZXJfbG90ZSddW2ZpZWxkXVsncGljdHVyZSddXG4gICAgICAgICAgICAgICAgICAgICAgICApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXlvdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dDtcbiAgICB9XG5cbiAgICBub3ZvRGV0YWxoZShleGNldG9TZWdtZW50b3MgPSBbXSkge1xuICAgICAgICBsZXQgZGV0YWxoZSA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLmxheW91dFsnZGV0YWxoZXMnXSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5sYXlvdXRbJ2RldGFsaGVzJ10pLmZvckVhY2goKHNlZ21lbnRvKSA9PiB7XG4gICAgICAgICAgICAgICBpZiAoZXhjZXRvU2VnbWVudG9zLmluY2x1ZGVzKHNlZ21lbnRvKSkge1xuICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgZGV0YWxoZVtzZWdtZW50b10gPSB7fTtcblxuICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5sYXlvdXRbJ2RldGFsaGVzJ11bc2VnbWVudG9dKS5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgIGRldGFsaGVbc2VnbWVudG9dW2ZpZWxkXSA9ICh0aGlzLmxheW91dFsnZGV0YWxoZXMnXVtzZWdtZW50b11bZmllbGRdWydkZWZhdWx0J10gIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgICAgICAgICAgICBQaWN0dXJlLmVuY29kZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0WydkZXRhbGhlcyddW3NlZ21lbnRvXVtmaWVsZF1bJ2RlZmF1bHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0WydkZXRhbGhlcyddW3NlZ21lbnRvXVtmaWVsZF1bJ3BpY3R1cmUnXVxuICAgICAgICAgICAgICAgICAgICAgICApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgJyc7XG4gICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGV0YWxoZTtcbiAgICB9XG5cbiAgICBpbnNlcmlyRGV0YWxoZShkZXRhbGhlKSB7XG4gICAgICAgIHRoaXMuZGV0YWxoZXMucHVzaChkZXRhbGhlKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3VudERldGFsaGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXRhbGhlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgbGltcGFEZXRhbGhlcygpIHtcbiAgICAgICAgdGhpcy5kZXRhbGhlcyA9IFtdO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgbGV0IGhlYWRlckxvdGUgPSB0aGlzLmhlYWRlci50b0pTT04oKTtcbiAgICAgICAgbGV0IHRyYWlsZXJMb3RlID0gdGhpcy50cmFpbGVyLnRvSlNPTigpO1xuICAgICAgICBsZXQgZGV0YWxoZXMgPSB0aGlzLmRldGFsaGVzO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RpZ29fbG90ZTogdGhpcy5zZXF1ZW5jaWFsLFxuICAgICAgICAgICAgaGVhZGVyX2xvdGU6IGhlYWRlckxvdGUsXG4gICAgICAgICAgICBkZXRhbGhlcyxcbiAgICAgICAgICAgIHRyYWlsZXJfbG90ZTogdHJhaWxlckxvdGUsXG4gICAgICAgIH07XG4gICAgfVxufTsiXX0=