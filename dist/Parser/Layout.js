'use strict';var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

module.exports = function () {
    function Layout(banco) {var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '240';var arquivo = arguments[2];var _ref = arguments[3];var _ref$layoutPath = _ref.layoutPath,layoutPath = _ref$layoutPath === undefined ? '../../layouts' : _ref$layoutPath,_ref$loadFromFile = _ref.loadFromFile,loadFromFile = _ref$loadFromFile === undefined ? true : _ref$loadFromFile;_classCallCheck(this, Layout);
        this._arquivo = arquivo;
        if (loadFromFile) {
            this._config = require(_path2.default.resolve(layoutPath + '/' + banco + '/' + layout + '/' + arquivo + '.json'));
        } else {
            if ((typeof arquivo === 'undefined' ? 'undefined' : _typeof(arquivo)) === "object" &&
            Object.keys(arquivo).includes('servico') &&
            Object.keys(arquivo).includes('versao') &&
            Object.keys(arquivo).includes('layout') &&
            Object.keys(arquivo).includes('remessa') &&
            Object.keys(arquivo).includes('retorno') &&
            arquivo['layout'] === layout) {
                this._config = arquivo;
            } else {
                throw new Error('O layout informado é inválido');
            }
        }
    }_createClass(Layout, [{ key: 'getRemessaLayout', value: function getRemessaLayout()

        {
            if (!this._config['remessa']) {
                throw new Error('Falta a se\xE7\xE3o \'remessa\' no arquivo de layout');
            }

            return this._config['remessa'];
        } }, { key: 'getRetornoLayout', value: function getRetornoLayout()

        {
            if (!this._config['retorno']) {
                throw new Error('Falta a se\xE7\xE3o \'retorno\' no arquivo de layout');
            }

            return this._config['retorno'];
        } }, { key: 'getVersao', value: function getVersao()

        {
            return !this._config['retorno'] ? null : this._config['retorno'];
        } }, { key: 'getServico', value: function getServico()

        {
            return !this._config['servico'] ? null : this._config['servico'];
        } }, { key: 'getLayout', value: function getLayout()

        {
            return !this._config['layout'] ? null : this._config['layout'];
        } }, { key: 'getPrimeiroCodigoSegmentoRetorno', value: function getPrimeiroCodigoSegmentoRetorno()

        {
            var layout = this.getRetornoLayout();
            var segmentos = Object.keys(layout['detalhes']);
            var primeiroSegmento = segmentos[0];
            var partes = primeiroSegmento.split('_');

            return partes[partes.length - 1].toLowerCase();
        } }, { key: 'getUltimoCodigoSegmentoRetorno', value: function getUltimoCodigoSegmentoRetorno()

        {
            var layout = this.getRetornoLayout();
            var segmentos = Object.keys(layout['detalhes']);
            var ultimoSegmento = segmentos[segmentos.length - 1];
            var partes = ultimoSegmento.split('_');

            return partes[partes.length - 1].toLowerCase();
        } }]);return Layout;}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYXJzZXIvTGF5b3V0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJiYW5jbyIsImxheW91dCIsImFycXVpdm8iLCJsYXlvdXRQYXRoIiwibG9hZEZyb21GaWxlIiwiX2FycXVpdm8iLCJfY29uZmlnIiwicmVxdWlyZSIsInJlc29sdmUiLCJPYmplY3QiLCJrZXlzIiwiaW5jbHVkZXMiLCJFcnJvciIsImdldFJldG9ybm9MYXlvdXQiLCJzZWdtZW50b3MiLCJwcmltZWlyb1NlZ21lbnRvIiwicGFydGVzIiwic3BsaXQiLCJsZW5ndGgiLCJ0b0xvd2VyQ2FzZSIsInVsdGltb1NlZ21lbnRvIl0sIm1hcHBpbmdzIjoiMnpCQUFBLDRCOztBQUVBQSxPQUFPQyxPQUFQO0FBQ0ksb0JBQVlDLEtBQVosRUFBaUcsS0FBOUVDLE1BQThFLHVFQUFyRSxLQUFxRSxLQUE5REMsT0FBOEQsbUVBQXBEQyxVQUFvRCxDQUFwREEsVUFBb0QsbUNBQXZDLGVBQXVDLDRDQUF0QkMsWUFBc0IsQ0FBdEJBLFlBQXNCLHFDQUFQLElBQU87QUFDN0YsYUFBS0MsUUFBTCxHQUFnQkgsT0FBaEI7QUFDQSxZQUFJRSxZQUFKLEVBQWtCO0FBQ2QsaUJBQUtFLE9BQUwsR0FBZUMsUUFBUSxlQUFLQyxPQUFMLENBQWdCTCxVQUFoQixTQUE4QkgsS0FBOUIsU0FBdUNDLE1BQXZDLFNBQWlEQyxPQUFqRCxXQUFSLENBQWY7QUFDSCxTQUZELE1BRU87QUFDSCxnQkFBSSxRQUFPQSxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQW5CO0FBQ0FPLG1CQUFPQyxJQUFQLENBQVlSLE9BQVosRUFBcUJTLFFBQXJCLENBQThCLFNBQTlCLENBREE7QUFFQUYsbUJBQU9DLElBQVAsQ0FBWVIsT0FBWixFQUFxQlMsUUFBckIsQ0FBOEIsUUFBOUIsQ0FGQTtBQUdBRixtQkFBT0MsSUFBUCxDQUFZUixPQUFaLEVBQXFCUyxRQUFyQixDQUE4QixRQUE5QixDQUhBO0FBSUFGLG1CQUFPQyxJQUFQLENBQVlSLE9BQVosRUFBcUJTLFFBQXJCLENBQThCLFNBQTlCLENBSkE7QUFLQUYsbUJBQU9DLElBQVAsQ0FBWVIsT0FBWixFQUFxQlMsUUFBckIsQ0FBOEIsU0FBOUIsQ0FMQTtBQU1BVCxvQkFBUSxRQUFSLE1BQXNCRCxNQU4xQixFQU1rQztBQUM5QixxQkFBS0ssT0FBTCxHQUFlSixPQUFmO0FBQ0gsYUFSRCxNQVFPO0FBQ0gsc0JBQU0sSUFBSVUsS0FBSixDQUFVLCtCQUFWLENBQU47QUFDSDtBQUNKO0FBQ0osS0FsQkw7O0FBb0J1QjtBQUNmLGdCQUFJLENBQUMsS0FBS04sT0FBTCxDQUFhLFNBQWIsQ0FBTCxFQUE4QjtBQUMxQixzQkFBTSxJQUFJTSxLQUFKLHdEQUFOO0FBQ0g7O0FBRUQsbUJBQU8sS0FBS04sT0FBTCxDQUFhLFNBQWIsQ0FBUDtBQUNILFNBMUJMOztBQTRCdUI7QUFDZixnQkFBSSxDQUFDLEtBQUtBLE9BQUwsQ0FBYSxTQUFiLENBQUwsRUFBOEI7QUFDMUIsc0JBQU0sSUFBSU0sS0FBSix3REFBTjtBQUNIOztBQUVELG1CQUFPLEtBQUtOLE9BQUwsQ0FBYSxTQUFiLENBQVA7QUFDSCxTQWxDTDs7QUFvQ2dCO0FBQ1IsbUJBQVEsQ0FBQyxLQUFLQSxPQUFMLENBQWEsU0FBYixDQUFGLEdBQTZCLElBQTdCLEdBQW9DLEtBQUtBLE9BQUwsQ0FBYSxTQUFiLENBQTNDO0FBQ0gsU0F0Q0w7O0FBd0NpQjtBQUNULG1CQUFRLENBQUMsS0FBS0EsT0FBTCxDQUFhLFNBQWIsQ0FBRixHQUE2QixJQUE3QixHQUFvQyxLQUFLQSxPQUFMLENBQWEsU0FBYixDQUEzQztBQUNILFNBMUNMOztBQTRDZ0I7QUFDUixtQkFBUSxDQUFDLEtBQUtBLE9BQUwsQ0FBYSxRQUFiLENBQUYsR0FBNEIsSUFBNUIsR0FBbUMsS0FBS0EsT0FBTCxDQUFhLFFBQWIsQ0FBMUM7QUFDSCxTQTlDTDs7QUFnRHVDO0FBQy9CLGdCQUFJTCxTQUFTLEtBQUtZLGdCQUFMLEVBQWI7QUFDQSxnQkFBSUMsWUFBWUwsT0FBT0MsSUFBUCxDQUFZVCxPQUFPLFVBQVAsQ0FBWixDQUFoQjtBQUNBLGdCQUFJYyxtQkFBbUJELFVBQVUsQ0FBVixDQUF2QjtBQUNBLGdCQUFJRSxTQUFTRCxpQkFBaUJFLEtBQWpCLENBQXVCLEdBQXZCLENBQWI7O0FBRUEsbUJBQU9ELE9BQU9BLE9BQU9FLE1BQVAsR0FBZ0IsQ0FBdkIsRUFBMEJDLFdBQTFCLEVBQVA7QUFDSCxTQXZETDs7QUF5RHFDO0FBQzdCLGdCQUFJbEIsU0FBUyxLQUFLWSxnQkFBTCxFQUFiO0FBQ0EsZ0JBQUlDLFlBQVlMLE9BQU9DLElBQVAsQ0FBWVQsT0FBTyxVQUFQLENBQVosQ0FBaEI7QUFDQSxnQkFBSW1CLGlCQUFpQk4sVUFBVUEsVUFBVUksTUFBVixHQUFtQixDQUE3QixDQUFyQjtBQUNBLGdCQUFJRixTQUFTSSxlQUFlSCxLQUFmLENBQXFCLEdBQXJCLENBQWI7O0FBRUEsbUJBQU9ELE9BQU9BLE9BQU9FLE1BQVAsR0FBZ0IsQ0FBdkIsRUFBMEJDLFdBQTFCLEVBQVA7QUFDSCxTQWhFTCIsImZpbGUiOiJMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBMYXlvdXQge1xuICAgIGNvbnN0cnVjdG9yKGJhbmNvLCBsYXlvdXQgPSAnMjQwJywgYXJxdWl2bywge2xheW91dFBhdGggPSAnLi4vLi4vbGF5b3V0cycsIGxvYWRGcm9tRmlsZSA9IHRydWV9KSB7XG4gICAgICAgIHRoaXMuX2FycXVpdm8gPSBhcnF1aXZvO1xuICAgICAgICBpZiAobG9hZEZyb21GaWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25maWcgPSByZXF1aXJlKHBhdGgucmVzb2x2ZShgJHtsYXlvdXRQYXRofS8ke2JhbmNvfS8ke2xheW91dH0vJHthcnF1aXZvfS5qc29uYCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcnF1aXZvID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoYXJxdWl2bykuaW5jbHVkZXMoJ3NlcnZpY28nKSAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGFycXVpdm8pLmluY2x1ZGVzKCd2ZXJzYW8nKSAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGFycXVpdm8pLmluY2x1ZGVzKCdsYXlvdXQnKSAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGFycXVpdm8pLmluY2x1ZGVzKCdyZW1lc3NhJykgJiZcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhhcnF1aXZvKS5pbmNsdWRlcygncmV0b3JubycpICYmXG4gICAgICAgICAgICAgICAgYXJxdWl2b1snbGF5b3V0J10gPT09IGxheW91dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IGFycXVpdm87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTyBsYXlvdXQgaW5mb3JtYWRvIMOpIGludsOhbGlkbycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UmVtZXNzYUxheW91dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWdbJ3JlbWVzc2EnXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWx0YSBhIHNlw6fDo28gJ3JlbWVzc2EnIG5vIGFycXVpdm8gZGUgbGF5b3V0YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnWydyZW1lc3NhJ107XG4gICAgfVxuXG4gICAgZ2V0UmV0b3Jub0xheW91dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWdbJ3JldG9ybm8nXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWx0YSBhIHNlw6fDo28gJ3JldG9ybm8nIG5vIGFycXVpdm8gZGUgbGF5b3V0YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnWydyZXRvcm5vJ107XG4gICAgfVxuXG4gICAgZ2V0VmVyc2FvKCkge1xuICAgICAgICByZXR1cm4gKCF0aGlzLl9jb25maWdbJ3JldG9ybm8nXSkgPyBudWxsIDogdGhpcy5fY29uZmlnWydyZXRvcm5vJ107XG4gICAgfVxuXG4gICAgZ2V0U2VydmljbygpIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy5fY29uZmlnWydzZXJ2aWNvJ10pID8gbnVsbCA6IHRoaXMuX2NvbmZpZ1snc2VydmljbyddO1xuICAgIH1cblxuICAgIGdldExheW91dCgpIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy5fY29uZmlnWydsYXlvdXQnXSkgPyBudWxsIDogdGhpcy5fY29uZmlnWydsYXlvdXQnXTtcbiAgICB9XG5cbiAgICBnZXRQcmltZWlyb0NvZGlnb1NlZ21lbnRvUmV0b3JubygpIHtcbiAgICAgICAgbGV0IGxheW91dCA9IHRoaXMuZ2V0UmV0b3Jub0xheW91dCgpO1xuICAgICAgICBsZXQgc2VnbWVudG9zID0gT2JqZWN0LmtleXMobGF5b3V0WydkZXRhbGhlcyddKTtcbiAgICAgICAgbGV0IHByaW1laXJvU2VnbWVudG8gPSBzZWdtZW50b3NbMF07XG4gICAgICAgIGxldCBwYXJ0ZXMgPSBwcmltZWlyb1NlZ21lbnRvLnNwbGl0KCdfJyk7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRlc1twYXJ0ZXMubGVuZ3RoIC0gMV0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBnZXRVbHRpbW9Db2RpZ29TZWdtZW50b1JldG9ybm8oKSB7XG4gICAgICAgIGxldCBsYXlvdXQgPSB0aGlzLmdldFJldG9ybm9MYXlvdXQoKTtcbiAgICAgICAgbGV0IHNlZ21lbnRvcyA9IE9iamVjdC5rZXlzKGxheW91dFsnZGV0YWxoZXMnXSk7XG4gICAgICAgIGxldCB1bHRpbW9TZWdtZW50byA9IHNlZ21lbnRvc1tzZWdtZW50b3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBwYXJ0ZXMgPSB1bHRpbW9TZWdtZW50by5zcGxpdCgnXycpO1xuXG4gICAgICAgIHJldHVybiBwYXJ0ZXNbcGFydGVzLmxlbmd0aCAtIDFdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxufSJdfQ==