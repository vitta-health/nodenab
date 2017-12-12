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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbC9SZXRvcm5vLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJoZWFkZXJBcnF1aXZvIiwidHJhaWxlckFycXVpdm8iLCJsb3RlcyIsImxpbmhhIiwibGF5b3V0IiwiZ2V0VGlwbyIsImdldExheW91dCIsImdldFJlbWVzc2FMYXlvdXQiLCJnZXRSZXRvcm5vTGF5b3V0IiwiY2FtcG9zIiwiZGFkb3MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIm5vbWUiLCJvYnRlclZhbG9yQ2FtcG8iLCJsZW5ndGgiLCJ0b3RhbCIsImxvdGUiLCJoZWFkZXIiLCJ0cmFpbGVyIl0sIm1hcHBpbmdzIjoidXNCQUFBQSxPQUFPQyxPQUFQO0FBQ0ksdUJBQWM7QUFDVixhQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQixFQUF0QjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0gsS0FMTDs7QUFPcUJDLGFBUHJCLEVBTzRCO0FBQ3BCLGdCQUFNQyxTQUFVRCxNQUFNRSxPQUFOLE9BQW9CLFNBQXJCO0FBQ1hGLGtCQUFNRyxTQUFOLEdBQWtCQyxnQkFBbEIsRUFEVztBQUVYSixrQkFBTUcsU0FBTixHQUFrQkUsZ0JBQWxCLEVBRko7QUFHQSxnQkFBTUMsU0FBU0wsT0FBTyxhQUFQLENBQWY7QUFDQSxnQkFBSU0sUUFBUSxFQUFaOztBQUVBQyxtQkFBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9CSSxPQUFwQixDQUE0QixVQUFDQyxJQUFELEVBQVU7QUFDbENKLHNCQUFNSSxJQUFOLElBQWNYLE1BQU1ZLGVBQU4sQ0FBc0JOLE9BQU9LLElBQVAsQ0FBdEIsQ0FBZDtBQUNILGFBRkQ7O0FBSUEsbUJBQU9KLEtBQVA7QUFDSCxTQW5CTDs7QUFxQnNCUCxhQXJCdEIsRUFxQjZCO0FBQ3JCLGdCQUFNQyxTQUFVRCxNQUFNRSxPQUFOLE9BQW9CLFNBQXJCO0FBQ1hGLGtCQUFNRyxTQUFOLEdBQWtCQyxnQkFBbEIsRUFEVztBQUVYSixrQkFBTUcsU0FBTixHQUFrQkUsZ0JBQWxCLEVBRko7QUFHQSxnQkFBTUMsU0FBU0wsT0FBTyxjQUFQLENBQWY7QUFDQSxnQkFBSU0sUUFBUSxFQUFaOztBQUVBQyxtQkFBT0MsSUFBUCxDQUFZSCxNQUFaLEVBQW9CSSxPQUFwQixDQUE0QixVQUFDQyxJQUFELEVBQVU7QUFDbENKLHNCQUFNSSxJQUFOLElBQWNYLE1BQU1ZLGVBQU4sQ0FBc0JOLE9BQU9LLElBQVAsQ0FBdEIsQ0FBZDtBQUNILGFBRkQ7O0FBSUEsbUJBQU9KLEtBQVA7QUFDSCxTQWpDTDs7QUFtQ29CO0FBQ1osbUJBQU8sS0FBS1IsS0FBTCxDQUFXYyxNQUFsQjtBQUNILFNBckNMOztBQXVDc0I7QUFDZCxnQkFBSUMsUUFBUSxDQUFaOztBQUVBLGlCQUFLZixLQUFMLENBQVdXLE9BQVgsQ0FBbUIsVUFBQ0ssSUFBRCxFQUFVO0FBQ3pCRCx5QkFBU0MsS0FBSyxTQUFMLEVBQWdCRixNQUF6QjtBQUNILGFBRkQ7O0FBSUEsbUJBQU9DLEtBQVA7QUFDSCxTQS9DTDs7QUFpRGE7QUFDTCxtQkFBUTtBQUNKRSx3QkFBUSxLQUFLbkIsYUFEVDtBQUVKb0IseUJBQVMsS0FBS25CLGNBRlY7QUFHSkMsdUJBQU8sS0FBS0EsS0FIUixFQUFSOztBQUtILFNBdkRMIiwiZmlsZSI6IlJldG9ybm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFJldG9ybm8ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhlYWRlckFycXVpdm8gPSB7fTtcbiAgICAgICAgdGhpcy50cmFpbGVyQXJxdWl2byA9IHt9O1xuICAgICAgICB0aGlzLmxvdGVzID0gW107XG4gICAgfVxuXG4gICAgZGVjb2RlSGVhZGVyTG90ZShsaW5oYSkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAobGluaGEuZ2V0VGlwbygpID09PSAncmVtZXNzYScpID9cbiAgICAgICAgICAgIGxpbmhhLmdldExheW91dCgpLmdldFJlbWVzc2FMYXlvdXQoKSA6XG4gICAgICAgICAgICBsaW5oYS5nZXRMYXlvdXQoKS5nZXRSZXRvcm5vTGF5b3V0KCk7XG4gICAgICAgIGNvbnN0IGNhbXBvcyA9IGxheW91dFsnaGVhZGVyX2xvdGUnXTtcbiAgICAgICAgbGV0IGRhZG9zID0ge307XG5cbiAgICAgICAgT2JqZWN0LmtleXMoY2FtcG9zKS5mb3JFYWNoKChub21lKSA9PiB7XG4gICAgICAgICAgICBkYWRvc1tub21lXSA9IGxpbmhhLm9idGVyVmFsb3JDYW1wbyhjYW1wb3Nbbm9tZV0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYWRvcztcbiAgICB9XG5cbiAgICBkZWNvZGVUcmFpbGVyTG90ZShsaW5oYSkge1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAobGluaGEuZ2V0VGlwbygpID09PSAncmVtZXNzYScpID9cbiAgICAgICAgICAgIGxpbmhhLmdldExheW91dCgpLmdldFJlbWVzc2FMYXlvdXQoKSA6XG4gICAgICAgICAgICBsaW5oYS5nZXRMYXlvdXQoKS5nZXRSZXRvcm5vTGF5b3V0KCk7XG4gICAgICAgIGNvbnN0IGNhbXBvcyA9IGxheW91dFsndHJhaWxlcl9sb3RlJ107XG4gICAgICAgIGxldCBkYWRvcyA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGNhbXBvcykuZm9yRWFjaCgobm9tZSkgPT4ge1xuICAgICAgICAgICAgZGFkb3Nbbm9tZV0gPSBsaW5oYS5vYnRlclZhbG9yQ2FtcG8oY2FtcG9zW25vbWVdKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGFkb3M7XG4gICAgfVxuXG4gICAgZ2V0VG90YWxMb3RlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG90ZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldFRvdGFsVGl0dWxvcygpIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcblxuICAgICAgICB0aGlzLmxvdGVzLmZvckVhY2goKGxvdGUpID0+IHtcbiAgICAgICAgICAgIHRvdGFsICs9IGxvdGVbJ3RpdHVsb3MnXS5sZW5ndGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG5cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgaGVhZGVyOiB0aGlzLmhlYWRlckFycXVpdm8sXG4gICAgICAgICAgICB0cmFpbGVyOiB0aGlzLnRyYWlsZXJBcnF1aXZvLFxuICAgICAgICAgICAgbG90ZXM6IHRoaXMubG90ZXNcbiAgICAgICAgfTtcbiAgICB9XG59OyJdfQ==