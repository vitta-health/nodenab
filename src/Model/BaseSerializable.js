module.exports = class BaseSerializable {
    constructor() {
        this._data = {};
    }

    toJSON() {
        return this._data;
    }

    set(name, value) {
        this._data[name] = value;
    }

    get(name) {
        return this._data[name] || null;
    }

    includes(name) {
        return Object.keys(this._data).includes(name);
    }

    excludes(name) {
        delete this._data[name];
    }
}