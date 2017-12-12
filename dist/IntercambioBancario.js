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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9JbnRlcmNhbWJpb0JhbmNhcmlvLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJsYXlvdXQiLCJfbGF5b3V0IiwiaGVhZGVyIiwidHJhaWxlciIsImxvdGVzIiwibG90ZSIsInB1c2giLCJzZXF1ZW5jaWFsIiwiZm91bmQiLCJmb3JFYWNoIiwiaW5kZXgiLCJoZWFkZXJBcnF1aXZvIiwidG9KU09OIiwidHJhaWxlckFycXVpdm8iLCJoZWFkZXJfYXJxdWl2byIsInRyYWlsZXJfYXJxdWl2byJdLCJtYXBwaW5ncyI6ImtqQkFBQSxzRDtBQUNBLHdEOztBQUVBQSxPQUFPQyxPQUFQO0FBQ0ksaUNBQVlDLE1BQVosRUFBb0I7QUFDaEIsYUFBS0MsT0FBTCxHQUFlRCxNQUFmO0FBQ0EsYUFBS0UsTUFBTCxHQUFjLDZCQUFkO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLDhCQUFmO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSCxLQU5MOztBQVFnQjtBQUNSLG1CQUFPLEtBQUtILE9BQVo7QUFDSCxTQVZMOztBQVlnQkksWUFaaEIsRUFZc0I7QUFDZCxpQkFBS0QsS0FBTCxDQUFXRSxJQUFYLENBQWdCRCxJQUFoQjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0gsU0FoQkw7O0FBa0JnQkUsa0JBbEJoQixFQWtCNEI7QUFDcEIsZ0JBQUlDLFFBQVEsQ0FBQyxDQUFiOztBQUVBLGlCQUFLSixLQUFMLENBQVdLLE9BQVgsQ0FBbUIsVUFBQ0osSUFBRCxFQUFPSyxLQUFQLEVBQWlCO0FBQ2hDLG9CQUFJTCxLQUFLRSxVQUFMLEtBQW9CQSxVQUF4QixFQUFvQztBQUNoQ0MsNEJBQVFFLEtBQVI7QUFDSDtBQUNKLGFBSkQ7O0FBTUEsZ0JBQUlGLFFBQVEsQ0FBQyxDQUFiLEVBQWdCO0FBQ1osdUJBQU8sS0FBS0osS0FBTCxDQUFXSSxLQUFYLENBQVA7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0gsU0FoQ0w7O0FBa0NrQjtBQUNWLGlCQUFLSixLQUFMLEdBQWEsRUFBYjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0gsU0F0Q0w7O0FBd0NhO0FBQ0wsZ0JBQUlPLGdCQUFnQixLQUFLVCxNQUFMLENBQVlVLE1BQVosRUFBcEI7QUFDQSxnQkFBSUMsaUJBQWlCLEtBQUtWLE9BQUwsQ0FBYVMsTUFBYixFQUFyQjtBQUNBLGdCQUFJUixRQUFRLEtBQUtBLEtBQWpCOztBQUVBLG1CQUFPO0FBQ0hVLGdDQUFnQkgsYUFEYjtBQUVIUCw0QkFGRztBQUdIVyxpQ0FBaUJGLGNBSGQsRUFBUDs7QUFLSCxTQWxETCIsImZpbGUiOiJJbnRlcmNhbWJpb0JhbmNhcmlvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWRlckFycXVpdm8gZnJvbSAnLi9Nb2RlbC9IZWFkZXJBcnF1aXZvJztcbmltcG9ydCBUcmFpbGVyQXJxdWl2byBmcm9tICcuL01vZGVsL1RyYWlsZXJBcnF1aXZvJztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBJbnRlcmNhbWJpb0JhbmNhcmlvIHtcbiAgICBjb25zdHJ1Y3RvcihsYXlvdXQpIHtcbiAgICAgICAgdGhpcy5fbGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICB0aGlzLmhlYWRlciA9IG5ldyBIZWFkZXJBcnF1aXZvKCk7XG4gICAgICAgIHRoaXMudHJhaWxlciA9IG5ldyBUcmFpbGVyQXJxdWl2bygpO1xuICAgICAgICB0aGlzLmxvdGVzID0gW107XG4gICAgfVxuXG4gICAgZ2V0TGF5b3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0O1xuICAgIH1cblxuICAgIGluc2VyaXJMb3RlKGxvdGUpIHtcbiAgICAgICAgdGhpcy5sb3Rlcy5wdXNoKGxvdGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbW92ZXJMb3RlKHNlcXVlbmNpYWwpIHtcbiAgICAgICAgbGV0IGZvdW5kID0gLTE7XG5cbiAgICAgICAgdGhpcy5sb3Rlcy5mb3JFYWNoKChsb3RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxvdGUuc2VxdWVuY2lhbCA9PT0gc2VxdWVuY2lhbCkge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmb3VuZCA+IC0xKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5sb3Rlc1tmb3VuZF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsaW1wYXJMb3RlcygpIHtcbiAgICAgICAgdGhpcy5sb3RlcyA9IFtdO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgbGV0IGhlYWRlckFycXVpdm8gPSB0aGlzLmhlYWRlci50b0pTT04oKTtcbiAgICAgICAgbGV0IHRyYWlsZXJBcnF1aXZvID0gdGhpcy50cmFpbGVyLnRvSlNPTigpO1xuICAgICAgICBsZXQgbG90ZXMgPSB0aGlzLmxvdGVzO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWFkZXJfYXJxdWl2bzogaGVhZGVyQXJxdWl2byxcbiAgICAgICAgICAgIGxvdGVzLFxuICAgICAgICAgICAgdHJhaWxlcl9hcnF1aXZvOiB0cmFpbGVyQXJxdWl2byxcbiAgICAgICAgfTtcbiAgICB9XG59OyJdfQ==