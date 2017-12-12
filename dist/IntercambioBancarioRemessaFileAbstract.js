'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var IntercambioBancarioFileAbstract = require('./IntercambioBancarioFileAbstract');
var Picture = require('./Format/Picture');

module.exports = function (_IntercambioBancarioF) {_inherits(IntercambioBancarioRemessaFileAbstract, _IntercambioBancarioF);
    function IntercambioBancarioRemessaFileAbstract(model) {_classCallCheck(this, IntercambioBancarioRemessaFileAbstract);var _this = _possibleConstructorReturn(this, (IntercambioBancarioRemessaFileAbstract.__proto__ || Object.getPrototypeOf(IntercambioBancarioRemessaFileAbstract)).call(this));


        _this._model = model;return _this;
    }_createClass(IntercambioBancarioRemessaFileAbstract, [{ key: '_encode', value: function _encode(

        fieldsDef, modelSection) {
            var encoded = '';

            Object.keys(fieldsDef).forEach(function (field) {
                if (modelSection[field] !== undefined) {
                    var format = fieldsDef[field]['picture'];
                    encoded += Picture.encode(modelSection[field], format, { fieldDesc: fieldsDef[field], field: field });
                }
            });

            return encoded;
        } }]);return IntercambioBancarioRemessaFileAbstract;}(IntercambioBancarioFileAbstract);