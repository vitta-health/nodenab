'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Picture = require('../Format/Picture');
var IntercambioBancario = require('../IntercambioBancario');
var Lote = require('./Lote');

module.exports = function (_IntercambioBancario) {_inherits(Remessa, _IntercambioBancario);
    function Remessa(layout) {_classCallCheck(this, Remessa);var _this = _possibleConstructorReturn(this, (Remessa.__proto__ || Object.getPrototypeOf(Remessa)).call(this,
        layout));

        var remessaLayout = _this._layout.getRemessaLayout();

        if (remessaLayout['header_arquivo']) {
            Object.keys(remessaLayout['header_arquivo']).forEach(function (field) {
                _this.header.set(
                field,
                remessaLayout['header_arquivo'][field]['default'] !== undefined ?
                Picture.encode(
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
                Picture.encode(
                remessaLayout['trailer_arquivo'][field]['default'],
                remessaLayout['trailer_arquivo'][field]['picture'],
                { field: field }) :

                '');

            });
        }return _this;
    }_createClass(Remessa, [{ key: 'novoLote', value: function novoLote()

        {var sequencial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            return new Lote(this._layout.getRemessaLayout(), sequencial);
        } }]);return Remessa;}(IntercambioBancario);