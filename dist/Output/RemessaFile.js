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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9PdXRwdXQvUmVtZXNzYUZpbGUuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImhlYWRlckFycXVpdm8iLCJfZW5jb2RlSGVhZGVyQXJxdWl2byIsImxvdGVzIiwiX2VuY29kZUxvdGVzIiwidHJhaWxlckFycXVpdm8iLCJfZW5jb2RlVHJhaWxlckFycXVpdm8iLCJkYXRhIiwiam9pbiIsIlJlbWVzc2FGaWxlIiwiQ05BQl9FT0wiLCJfbW9kZWwiLCJoZWFkZXIiLCJsYXlvdXQiLCJnZXRMYXlvdXQiLCJsYXlvdXRSZW1lc3NhIiwiZ2V0UmVtZXNzYUxheW91dCIsIl9lbmNvZGUiLCJfZGF0YSIsImVuY29kZWQiLCJmb3JFYWNoIiwibG90ZSIsInB1c2giLCJfZW5jb2RlSGVhZGVyTG90ZSIsIl9lbmNvZGVEZXRhbGhlcyIsInRyYWlsZXIiLCJfZW5jb2RlVHJhaWxlckxvdGUiLCJtb2RlbCIsImRldGFsaGVzIiwiZGV0YWxoZSIsIk9iamVjdCIsImtleXMiLCJzZWdtZW50byIsInNlZ21lbnRvRW5jb2RlZCJdLCJtYXBwaW5ncyI6ImtqQkFBQSx3QjtBQUNBLDRCO0FBQ0EsbUc7O0FBRUFBLE9BQU9DLE9BQVA7Ozs7O0FBS2U7QUFDUCxnQkFBSUMsZ0JBQWdCLEtBQUtDLG9CQUFMLEVBQXBCO0FBQ0EsZ0JBQUlDLFFBQVEsS0FBS0MsWUFBTCxFQUFaO0FBQ0EsZ0JBQUlDLGlCQUFpQixLQUFLQyxxQkFBTCxFQUFyQjs7QUFFQSxnQkFBSUMsT0FBTyxDQUFDTixhQUFELEVBQWdCRSxLQUFoQixFQUF1QkUsY0FBdkIsRUFBdUNHLElBQXZDLENBQTRDQyxZQUFZQyxRQUF4RCxDQUFYO0FBQ0FILG9CQUFRRSxZQUFZQyxRQUFwQjs7QUFFQSxtQkFBT0gsSUFBUDtBQUNILFNBZEw7O0FBZ0IyQjtBQUNuQixnQkFBSSxDQUFDLEtBQUtJLE1BQUwsQ0FBWUMsTUFBakIsRUFBeUI7O0FBRXpCLGdCQUFJQyxTQUFTLEtBQUtGLE1BQUwsQ0FBWUcsU0FBWixFQUFiO0FBQ0EsZ0JBQUlDLGdCQUFnQkYsT0FBT0csZ0JBQVAsRUFBcEI7O0FBRUEsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRixjQUFjLGdCQUFkLENBQWIsRUFBOEMsS0FBS0osTUFBTCxDQUFZQyxNQUFaLENBQW1CTSxLQUFqRSxDQUFQO0FBQ0gsU0F2Qkw7O0FBeUJtQjtBQUNYLGdCQUFJQyxVQUFVLEVBQWQ7O0FBRUEsaUJBQUtSLE1BQUwsQ0FBWVIsS0FBWixDQUFrQmlCLE9BQWxCLENBQTBCLFVBQUNDLElBQUQsRUFBVTtBQUNoQyxvQkFBSUEsS0FBS1QsTUFBVCxFQUFpQjtBQUNiTyw0QkFBUUcsSUFBUixDQUFhLE9BQUtDLGlCQUFMLENBQXVCRixJQUF2QixDQUFiO0FBQ0g7O0FBRURGLHdCQUFRRyxJQUFSLENBQWEsT0FBS0UsZUFBTCxDQUFxQkgsSUFBckIsQ0FBYjs7QUFFQSxvQkFBSUEsS0FBS0ksT0FBVCxFQUFrQjtBQUNkTiw0QkFBUUcsSUFBUixDQUFhLE9BQUtJLGtCQUFMLENBQXdCTCxJQUF4QixDQUFiO0FBQ0g7QUFDSixhQVZEOztBQVlBLG1CQUFPRixRQUFRWCxJQUFSLENBQWFDLFlBQVlDLFFBQXpCLENBQVA7QUFDSCxTQXpDTDs7QUEyQ3NCaUIsYUEzQ3RCLEVBMkM2QjtBQUNyQixnQkFBSSxDQUFDQSxNQUFNZixNQUFYLEVBQW1CO0FBQ2Y7QUFDSDs7QUFFRCxnQkFBSUMsU0FBVWMsTUFBTWIsU0FBTixFQUFkOztBQUVBLG1CQUFPLEtBQUtHLE9BQUwsQ0FBYUosT0FBTyxhQUFQLENBQWIsRUFBb0NjLE1BQU1mLE1BQU4sQ0FBYU0sS0FBakQsQ0FBUDtBQUNILFNBbkRMOztBQXFEb0JTLGFBckRwQixFQXFEMkI7QUFDbkIsZ0JBQUksQ0FBQ0EsTUFBTUMsUUFBWCxFQUFxQjtBQUNqQjtBQUNIOztBQUVELGdCQUFJZixTQUFTYyxNQUFNYixTQUFOLEVBQWI7QUFDQSxnQkFBSUssVUFBVSxFQUFkOztBQUVBUSxrQkFBTUMsUUFBTixDQUFlUixPQUFmLENBQXVCLFVBQUNTLE9BQUQsRUFBYTtBQUNoQ0MsdUJBQU9DLElBQVAsQ0FBWUYsT0FBWixFQUFxQlQsT0FBckIsQ0FBNkIsVUFBQ1ksUUFBRCxFQUFjO0FBQ3hDLHdCQUFJQyxrQkFBbUIsT0FBS2hCLE9BQUwsQ0FBYUosT0FBTyxVQUFQLEVBQW1CbUIsUUFBbkIsQ0FBYixFQUEyQ0gsUUFBUUcsUUFBUixDQUEzQyxDQUF2QjtBQUNBYiw0QkFBUUcsSUFBUixDQUFhVyxlQUFiO0FBQ0YsaUJBSEQ7QUFJSCxhQUxEOztBQU9BLG1CQUFPZCxRQUFRWCxJQUFSLENBQWFDLFlBQVlDLFFBQXpCLENBQVA7QUFDSCxTQXJFTDs7QUF1RXVCaUIsYUF2RXZCLEVBdUU4QjtBQUN0QixnQkFBSSxDQUFDQSxNQUFNRixPQUFYLEVBQW9CO0FBQ2hCO0FBQ0g7O0FBRUQsZ0JBQUlaLFNBQVNjLE1BQU1iLFNBQU4sRUFBYjs7QUFFQSxtQkFBTyxLQUFLRyxPQUFMLENBQWFKLE9BQU8sY0FBUCxDQUFiLEVBQXFDYyxNQUFNRixPQUFOLENBQWNQLEtBQW5ELENBQVA7QUFDSCxTQS9FTDs7QUFpRjRCO0FBQ3BCLGdCQUFJLENBQUMsS0FBS1AsTUFBTCxDQUFZYyxPQUFqQixFQUEwQjtBQUN0QjtBQUNIOztBQUVELGdCQUFJWixTQUFTLEtBQUtGLE1BQUwsQ0FBWUcsU0FBWixFQUFiO0FBQ0EsZ0JBQUlDLGdCQUFnQkYsT0FBT0csZ0JBQVAsRUFBcEI7O0FBRUEsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRixjQUFjLGlCQUFkLENBQWIsRUFBK0MsS0FBS0osTUFBTCxDQUFZYyxPQUFaLENBQW9CUCxLQUFuRSxDQUFQO0FBQ0gsU0ExRkwsNkNBQzBCLENBQ2xCLE9BQU8sTUFBUCxDQUNILENBSEwiLCJmaWxlIjoiUmVtZXNzYUZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgSW50ZXJjYW1iaW9CYW5jYXJpb1JlbWVzc2FGaWxlQWJzdHJhY3QgZnJvbSAnLi4vSW50ZXJjYW1iaW9CYW5jYXJpb1JlbWVzc2FGaWxlQWJzdHJhY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUmVtZXNzYUZpbGUgZXh0ZW5kcyBJbnRlcmNhbWJpb0JhbmNhcmlvUmVtZXNzYUZpbGVBYnN0cmFjdCB7XG4gICAgc3RhdGljIGdldCBDTkFCX0VPTCgpIHtcbiAgICAgICAgcmV0dXJuICdcXHJcXG4nO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICBsZXQgaGVhZGVyQXJxdWl2byA9IHRoaXMuX2VuY29kZUhlYWRlckFycXVpdm8oKTtcbiAgICAgICAgbGV0IGxvdGVzID0gdGhpcy5fZW5jb2RlTG90ZXMoKTtcbiAgICAgICAgbGV0IHRyYWlsZXJBcnF1aXZvID0gdGhpcy5fZW5jb2RlVHJhaWxlckFycXVpdm8oKTtcblxuICAgICAgICBsZXQgZGF0YSA9IFtoZWFkZXJBcnF1aXZvLCBsb3RlcywgdHJhaWxlckFycXVpdm9dLmpvaW4oUmVtZXNzYUZpbGUuQ05BQl9FT0wpO1xuICAgICAgICBkYXRhICs9IFJlbWVzc2FGaWxlLkNOQUJfRU9MO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIF9lbmNvZGVIZWFkZXJBcnF1aXZvKCkge1xuICAgICAgICBpZiAoIXRoaXMuX21vZGVsLmhlYWRlcikgcmV0dXJuO1xuXG4gICAgICAgIGxldCBsYXlvdXQgPSB0aGlzLl9tb2RlbC5nZXRMYXlvdXQoKTtcbiAgICAgICAgbGV0IGxheW91dFJlbWVzc2EgPSBsYXlvdXQuZ2V0UmVtZXNzYUxheW91dCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmNvZGUobGF5b3V0UmVtZXNzYVsnaGVhZGVyX2FycXVpdm8nXSwgdGhpcy5fbW9kZWwuaGVhZGVyLl9kYXRhKTtcbiAgICB9XG5cbiAgICBfZW5jb2RlTG90ZXMoKSB7XG4gICAgICAgIGxldCBlbmNvZGVkID0gW107XG5cbiAgICAgICAgdGhpcy5fbW9kZWwubG90ZXMuZm9yRWFjaCgobG90ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGxvdGUuaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgZW5jb2RlZC5wdXNoKHRoaXMuX2VuY29kZUhlYWRlckxvdGUobG90ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbmNvZGVkLnB1c2godGhpcy5fZW5jb2RlRGV0YWxoZXMobG90ZSkpO1xuXG4gICAgICAgICAgICBpZiAobG90ZS50cmFpbGVyKSB7XG4gICAgICAgICAgICAgICAgZW5jb2RlZC5wdXNoKHRoaXMuX2VuY29kZVRyYWlsZXJMb3RlKGxvdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGVuY29kZWQuam9pbihSZW1lc3NhRmlsZS5DTkFCX0VPTCk7XG4gICAgfVxuXG4gICAgX2VuY29kZUhlYWRlckxvdGUobW9kZWwpIHtcbiAgICAgICAgaWYgKCFtb2RlbC5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsYXlvdXQgID0gbW9kZWwuZ2V0TGF5b3V0KCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuY29kZShsYXlvdXRbJ2hlYWRlcl9sb3RlJ10sIG1vZGVsLmhlYWRlci5fZGF0YSk7XG4gICAgfVxuXG4gICAgX2VuY29kZURldGFsaGVzKG1vZGVsKSB7XG4gICAgICAgIGlmICghbW9kZWwuZGV0YWxoZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsYXlvdXQgPSBtb2RlbC5nZXRMYXlvdXQoKTtcbiAgICAgICAgbGV0IGVuY29kZWQgPSBbXTtcblxuICAgICAgICBtb2RlbC5kZXRhbGhlcy5mb3JFYWNoKChkZXRhbGhlKSA9PiB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkZXRhbGhlKS5mb3JFYWNoKChzZWdtZW50bykgPT4ge1xuICAgICAgICAgICAgICAgbGV0IHNlZ21lbnRvRW5jb2RlZCA9ICB0aGlzLl9lbmNvZGUobGF5b3V0WydkZXRhbGhlcyddW3NlZ21lbnRvXSwgZGV0YWxoZVtzZWdtZW50b10pO1xuICAgICAgICAgICAgICAgZW5jb2RlZC5wdXNoKHNlZ21lbnRvRW5jb2RlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGVuY29kZWQuam9pbihSZW1lc3NhRmlsZS5DTkFCX0VPTCk7XG4gICAgfVxuXG4gICAgX2VuY29kZVRyYWlsZXJMb3RlKG1vZGVsKSB7XG4gICAgICAgIGlmICghbW9kZWwudHJhaWxlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxheW91dCA9IG1vZGVsLmdldExheW91dCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmNvZGUobGF5b3V0Wyd0cmFpbGVyX2xvdGUnXSwgbW9kZWwudHJhaWxlci5fZGF0YSk7XG4gICAgfVxuXG4gICAgX2VuY29kZVRyYWlsZXJBcnF1aXZvKCkge1xuICAgICAgICBpZiAoIXRoaXMuX21vZGVsLnRyYWlsZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsYXlvdXQgPSB0aGlzLl9tb2RlbC5nZXRMYXlvdXQoKTtcbiAgICAgICAgbGV0IGxheW91dFJlbWVzc2EgPSBsYXlvdXQuZ2V0UmVtZXNzYUxheW91dCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmNvZGUobGF5b3V0UmVtZXNzYVsndHJhaWxlcl9hcnF1aXZvJ10sIHRoaXMuX21vZGVsLnRyYWlsZXIuX2RhdGEpO1xuICAgIH1cbn07Il19