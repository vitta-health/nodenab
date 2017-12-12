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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9JbnRlcmNhbWJpb0JhbmNhcmlvUmV0b3Jub0ZpbGVBYnN0cmFjdC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibGF5b3V0IiwibGluaGFzIiwiX2xheW91dCIsIl9saW5oYXMiLCJfdG90YWxMb3RlcyIsInNwbGl0IiwiZm9yRWFjaCIsImxpbmhhIiwicHVzaCIsIkVycm9yIiwiX2NhbGN1bGFUb3RhbExvdGVzIiwiX21vZGVsIiwiZ2V0TGF5b3V0IiwibGluaGFUcmFpbGVyQXJxdWl2b1N0ciIsImxlbmd0aCIsImRlZmluaWNhbyIsInBvcyIsInBpY3R1cmUiLCJvYnRlclZhbG9yQ2FtcG8iXSwibWFwcGluZ3MiOiJrakJBQUEsb0Y7QUFDQSwyQztBQUNBLDBDO0FBQ0Esc0M7O0FBRUFBLE9BQU9DLE9BQVA7QUFDeUM7QUFDakMsbUJBQU8sQ0FBUDtBQUNILFNBSEw7O0FBS3NDO0FBQzlCLG1CQUFPLENBQVA7QUFDSCxTQVBMOztBQVNtQztBQUMzQixtQkFBTyxDQUFQO0FBQ0gsU0FYTDs7QUFhMEM7QUFDbEMsbUJBQU8sQ0FBUDtBQUNILFNBZkw7O0FBaUJJLG9EQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0Qjs7QUFFeEIsY0FBS0MsT0FBTCxHQUFlRixNQUFmO0FBQ0EsY0FBS0csT0FBTCxHQUFlLEVBQWY7QUFDQSxjQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0FILGVBQU9JLEtBQVAsQ0FBYSxJQUFiLEVBQW1CQyxPQUFuQixDQUEyQixVQUFDQyxLQUFELEVBQVc7QUFDbEMsZ0JBQUlBLFVBQVUsRUFBZCxFQUFrQjtBQUNkO0FBQ0g7O0FBRUQsa0JBQUtKLE9BQUwsQ0FBYUssSUFBYixDQUFrQkQsS0FBbEI7QUFDSCxTQU5EOztBQVFBLFlBQUksQ0FBQyxNQUFLSixPQUFWLEVBQW1CO0FBQ2Ysa0JBQU0sSUFBSU0sS0FBSixpREFBTjtBQUNIOztBQUVELGNBQUtDLGtCQUFMO0FBQ0EsY0FBS0MsTUFBTCxHQUFjLHVCQUFkLENBbEJ3QjtBQW1CM0IsS0FwQ0w7O0FBc0N5QjtBQUNqQixpQkFBS1AsV0FBTCxHQUFtQixDQUFuQjtBQUNBLGdCQUFNSixTQUFTLEtBQUtFLE9BQUwsQ0FBYVUsU0FBYixFQUFmO0FBQ0EsZ0JBQU1DLHlCQUF5QixLQUFLVixPQUFMLENBQWEsS0FBS0EsT0FBTCxDQUFhVyxNQUFiLEdBQXNCLENBQW5DLENBQS9COztBQUVBLGdCQUFJUCxRQUFRLG9CQUFVTSxzQkFBVixFQUFrQyxLQUFLWCxPQUF2QyxFQUFnRCxTQUFoRCxDQUFaOztBQUVBLGdCQUFJRixXQUFXLEtBQWYsRUFBc0I7QUFDbEIsb0JBQU1lLFlBQVksRUFBQ0MsS0FBSyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQU4sRUFBZUMsU0FBUyxNQUF4QixFQUFsQjs7QUFFQSxxQkFBS2IsV0FBTCxHQUFtQixDQUFFRyxNQUFNVyxlQUFOLENBQXNCSCxTQUF0QixDQUFyQjtBQUNILGFBSkQsTUFJTztBQUNILHFCQUFLWCxXQUFMLEdBQW1CLENBQW5CO0FBQ0g7O0FBRUQsbUJBQU8sS0FBS0EsV0FBWjtBQUNILFNBdERMOztBQXdEb0I7QUFDWixtQkFBTyxLQUFLQSxXQUFaO0FBQ0gsU0ExREwiLCJmaWxlIjoiSW50ZXJjYW1iaW9CYW5jYXJpb1JldG9ybm9GaWxlQWJzdHJhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW50ZXJjYW1iaW9CYW5jYXJpb0ZpbGVBYnN0cmFjdCBmcm9tICcuL0ludGVyY2FtYmlvQmFuY2FyaW9GaWxlQWJzdHJhY3QnO1xuaW1wb3J0IFBpY3R1cmUgZnJvbSAnLi9Gb3JtYXQvUGljdHVyZSc7XG5pbXBvcnQgUmV0b3JubyBmcm9tICcuL01vZGVsL1JldG9ybm8nO1xuaW1wb3J0IExpbmhhIGZyb20gJy4vTW9kZWwvTGluaGEnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEludGVyY2FtYmlvQmFuY2FyaW9SZXRvcm5vRmlsZUFic3RyYWN0IGV4dGVuZHMgSW50ZXJjYW1iaW9CYW5jYXJpb0ZpbGVBYnN0cmFjdCB7XG4gICAgc3RhdGljIGdldCBSRUdJU1RST19IRUFERVJfQVJRVUlWTygpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBSRUdJU1RST19IRUFERVJfTE9URSgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBSRUdJU1RST19ERVRBTEhFUygpIHtcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBSRUdJU1RST19UUkFJTEVSX0FSUVVJVk8oKSB7XG4gICAgICAgIHJldHVybiA5O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGxheW91dCwgbGluaGFzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2xheW91dCA9IGxheW91dDtcbiAgICAgICAgdGhpcy5fbGluaGFzID0gW107XG4gICAgICAgIHRoaXMuX3RvdGFsTG90ZXMgPSAwO1xuICAgICAgICBsaW5oYXMuc3BsaXQoXCJcXG5cIikuZm9yRWFjaCgobGluaGEpID0+IHtcbiAgICAgICAgICAgIGlmIChsaW5oYSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2xpbmhhcy5wdXNoKGxpbmhhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9saW5oYXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTyBhcnF1aXZvIGRlIHJldG9ybm8gcGFzc2FkbyDDqSBpbnbDoWxpZG9gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NhbGN1bGFUb3RhbExvdGVzKCk7XG4gICAgICAgIHRoaXMuX21vZGVsID0gbmV3IFJldG9ybm8oKTtcbiAgICB9XG5cbiAgICBfY2FsY3VsYVRvdGFsTG90ZXMoKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsTG90ZXMgPSAxO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLl9sYXlvdXQuZ2V0TGF5b3V0KCk7XG4gICAgICAgIGNvbnN0IGxpbmhhVHJhaWxlckFycXVpdm9TdHIgPSB0aGlzLl9saW5oYXNbdGhpcy5fbGluaGFzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGxldCBsaW5oYSA9IG5ldyBMaW5oYShsaW5oYVRyYWlsZXJBcnF1aXZvU3RyLCB0aGlzLl9sYXlvdXQsICdyZXRvcm5vJyk7XG5cbiAgICAgICAgaWYgKGxheW91dCA9PT0gJzI0MCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmluaWNhbyA9IHtwb3M6IFsxOCwyM10sIHBpY3R1cmU6ICc5KDYpJ307XG5cbiAgICAgICAgICAgIHRoaXMuX3RvdGFsTG90ZXMgPSArKGxpbmhhLm9idGVyVmFsb3JDYW1wbyhkZWZpbmljYW8pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsTG90ZXMgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsTG90ZXM7XG4gICAgfVxuXG4gICAgZ2V0VG90YWxMb3RlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsTG90ZXM7XG4gICAgfVxuXG5cbn07Il19