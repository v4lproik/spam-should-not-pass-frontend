class LoginStore {

    constructor() {
        this.userKey     = "user";

        var supported = this.localStorageSupported();
        this.storage = supported ? window.localStorage : getFakeStorage;
    }

    localStorageSupported() {
        var testKey = "test";
        var storage = window.localStorage;

        try {
            storage.setItem(testKey, "1");
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    getFakeStorage() {
        return fakeStorage = {
            _data: {},

            setItem(id, val) {
                return this._data[id] = String(val);
            },

            getItem(id) {
                return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
            },

            removeItem(id) {
                return delete this._data[id];
            },

            clear() {
                return this._data = {};
            }
        };
    }

    getUser() {
        var stateJSON = this.storage.getItem(this.userKey);
        return stateJSON ? JSON.parse(stateJSON) : null;
    }

    setUser(user) {
        user.lastUpdate = {};
        user.lastUpdate = new Date();
        this.storage.setItem(this.userKey, JSON.stringify(user));
    }

    clearUser() {
        this.storage.removeItem(this.userKey);
    }
}

export default new LoginStore();