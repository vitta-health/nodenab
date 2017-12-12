"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}module.exports = function () {
    function BaseSerializable() {_classCallCheck(this, BaseSerializable);
        this._data = {};
    }_createClass(BaseSerializable, [{ key: "toJSON", value: function toJSON()

        {
            return this._data;
        } }, { key: "set", value: function set(

        name, value) {
            this._data[name] = value;
        } }, { key: "get", value: function get(

        name) {
            return this._data[name] || null;
        } }, { key: "includes", value: function includes(

        name) {
            return Object.keys(this._data).includes(name);
        } }, { key: "excludes", value: function excludes(

        name) {
            delete this._data[name];
        } }]);return BaseSerializable;}();