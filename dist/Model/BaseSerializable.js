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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbC9CYXNlU2VyaWFsaXphYmxlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJfZGF0YSIsIm5hbWUiLCJ2YWx1ZSIsIk9iamVjdCIsImtleXMiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6InVzQkFBQUEsT0FBT0MsT0FBUDtBQUNJLGdDQUFjO0FBQ1YsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSCxLQUhMOztBQUthO0FBQ0wsbUJBQU8sS0FBS0EsS0FBWjtBQUNILFNBUEw7O0FBU1FDLFlBVFIsRUFTY0MsS0FUZCxFQVNxQjtBQUNiLGlCQUFLRixLQUFMLENBQVdDLElBQVgsSUFBbUJDLEtBQW5CO0FBQ0gsU0FYTDs7QUFhUUQsWUFiUixFQWFjO0FBQ04sbUJBQU8sS0FBS0QsS0FBTCxDQUFXQyxJQUFYLEtBQW9CLElBQTNCO0FBQ0gsU0FmTDs7QUFpQmFBLFlBakJiLEVBaUJtQjtBQUNYLG1CQUFPRSxPQUFPQyxJQUFQLENBQVksS0FBS0osS0FBakIsRUFBd0JLLFFBQXhCLENBQWlDSixJQUFqQyxDQUFQO0FBQ0gsU0FuQkw7O0FBcUJhQSxZQXJCYixFQXFCbUI7QUFDWCxtQkFBTyxLQUFLRCxLQUFMLENBQVdDLElBQVgsQ0FBUDtBQUNILFNBdkJMIiwiZmlsZSI6IkJhc2VTZXJpYWxpemFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEJhc2VTZXJpYWxpemFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG5cbiAgICBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGF0YVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW25hbWVdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgaW5jbHVkZXMobmFtZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZGF0YSkuaW5jbHVkZXMobmFtZSk7XG4gICAgfVxuXG4gICAgZXhjbHVkZXMobmFtZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5fZGF0YVtuYW1lXTtcbiAgICB9XG59Il19