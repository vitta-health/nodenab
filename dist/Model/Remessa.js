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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbC9SZW1lc3NhLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJsYXlvdXQiLCJyZW1lc3NhTGF5b3V0IiwiX2xheW91dCIsImdldFJlbWVzc2FMYXlvdXQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImZpZWxkIiwiaGVhZGVyIiwic2V0IiwidW5kZWZpbmVkIiwiZW5jb2RlIiwidHJhaWxlciIsInNlcXVlbmNpYWwiXSwibWFwcGluZ3MiOiJrakJBQUEsNEM7QUFDQSw4RDtBQUNBLDhCOztBQUVBQSxPQUFPQyxPQUFQO0FBQ0kscUJBQVlDLE1BQVosRUFBb0I7QUFDVkEsY0FEVTs7QUFHaEIsWUFBSUMsZ0JBQWdCLE1BQUtDLE9BQUwsQ0FBYUMsZ0JBQWIsRUFBcEI7O0FBRUEsWUFBSUYsY0FBYyxnQkFBZCxDQUFKLEVBQXFDO0FBQ2pDRyxtQkFBT0MsSUFBUCxDQUFZSixjQUFjLGdCQUFkLENBQVosRUFBNkNLLE9BQTdDLENBQXFELFVBQUNDLEtBQUQsRUFBVztBQUM1RCxzQkFBS0MsTUFBTCxDQUFZQyxHQUFaO0FBQ0lGLHFCQURKO0FBRUtOLDhCQUFjLGdCQUFkLEVBQWdDTSxLQUFoQyxFQUF1QyxTQUF2QyxNQUFzREcsU0FBdkQ7QUFDSSxrQ0FBUUMsTUFBUjtBQUNJViw4QkFBYyxnQkFBZCxFQUFnQ00sS0FBaEMsRUFBdUMsU0FBdkMsQ0FESjtBQUVJTiw4QkFBYyxnQkFBZCxFQUFnQ00sS0FBaEMsRUFBdUMsU0FBdkMsQ0FGSjtBQUdJLGtCQUFFQSxZQUFGLEVBSEosQ0FESjs7QUFNSSxrQkFSUjs7QUFVSCxhQVhEO0FBWUg7O0FBRUQsWUFBSU4sY0FBYyxpQkFBZCxDQUFKLEVBQXNDO0FBQ2xDRyxtQkFBT0MsSUFBUCxDQUFZSixjQUFjLGlCQUFkLENBQVosRUFBOENLLE9BQTlDLENBQXNELFVBQUNDLEtBQUQsRUFBVztBQUM3RCxzQkFBS0ssT0FBTCxDQUFhSCxHQUFiO0FBQ0lGLHFCQURKO0FBRUtOLDhCQUFjLGlCQUFkLEVBQWlDTSxLQUFqQyxFQUF3QyxTQUF4QyxNQUF1REcsU0FBeEQ7QUFDSSxrQ0FBUUMsTUFBUjtBQUNJViw4QkFBYyxpQkFBZCxFQUFpQ00sS0FBakMsRUFBd0MsU0FBeEMsQ0FESjtBQUVJTiw4QkFBYyxpQkFBZCxFQUFpQ00sS0FBakMsRUFBd0MsU0FBeEMsQ0FGSjtBQUdJLGtCQUFFQSxZQUFGLEVBSEosQ0FESjs7QUFNSSxrQkFSUjs7QUFVSCxhQVhEO0FBWUgsU0FqQ2U7QUFrQ25CLEtBbkNMOztBQXFDNkIsYUFBaEJNLFVBQWdCLHVFQUFILENBQUc7QUFDckIsbUJBQU8sbUJBQVMsS0FBS1gsT0FBTCxDQUFhQyxnQkFBYixFQUFULEVBQTBDVSxVQUExQyxDQUFQO0FBQ0gsU0F2Q0wiLCJmaWxlIjoiUmVtZXNzYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaWN0dXJlIGZyb20gJy4uL0Zvcm1hdC9QaWN0dXJlJztcbmltcG9ydCBJbnRlcmNhbWJpb0JhbmNhcmlvIGZyb20gJy4uL0ludGVyY2FtYmlvQmFuY2FyaW8nO1xuaW1wb3J0IExvdGUgZnJvbSAnLi9Mb3RlJztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBSZW1lc3NhIGV4dGVuZHMgSW50ZXJjYW1iaW9CYW5jYXJpbyB7XG4gICAgY29uc3RydWN0b3IobGF5b3V0KSB7XG4gICAgICAgIHN1cGVyKGxheW91dCk7XG5cbiAgICAgICAgbGV0IHJlbWVzc2FMYXlvdXQgPSB0aGlzLl9sYXlvdXQuZ2V0UmVtZXNzYUxheW91dCgpO1xuXG4gICAgICAgIGlmIChyZW1lc3NhTGF5b3V0WydoZWFkZXJfYXJxdWl2byddKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhyZW1lc3NhTGF5b3V0WydoZWFkZXJfYXJxdWl2byddKS5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyLnNldChcbiAgICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIChyZW1lc3NhTGF5b3V0WydoZWFkZXJfYXJxdWl2byddW2ZpZWxkXVsnZGVmYXVsdCddICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFBpY3R1cmUuZW5jb2RlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWVzc2FMYXlvdXRbJ2hlYWRlcl9hcnF1aXZvJ11bZmllbGRdWydkZWZhdWx0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtZXNzYUxheW91dFsnaGVhZGVyX2FycXVpdm8nXVtmaWVsZF1bJ3BpY3R1cmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZpZWxkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZW1lc3NhTGF5b3V0Wyd0cmFpbGVyX2FycXVpdm8nXSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMocmVtZXNzYUxheW91dFsndHJhaWxlcl9hcnF1aXZvJ10pLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFpbGVyLnNldChcbiAgICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIChyZW1lc3NhTGF5b3V0Wyd0cmFpbGVyX2FycXVpdm8nXVtmaWVsZF1bJ2RlZmF1bHQnXSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBQaWN0dXJlLmVuY29kZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1lc3NhTGF5b3V0Wyd0cmFpbGVyX2FycXVpdm8nXVtmaWVsZF1bJ2RlZmF1bHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1lc3NhTGF5b3V0Wyd0cmFpbGVyX2FycXVpdm8nXVtmaWVsZF1bJ3BpY3R1cmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZpZWxkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5vdm9Mb3RlKHNlcXVlbmNpYWwgPSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgTG90ZSh0aGlzLl9sYXlvdXQuZ2V0UmVtZXNzYUxheW91dCgpLCBzZXF1ZW5jaWFsKTtcbiAgICB9XG59OyJdfQ==