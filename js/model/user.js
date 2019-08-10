class User {

    constructor(settings = {}) {
        for (let k in settings) {
            this[k] = settings[k];
        }
    }

    isAdult() {
        return this.age > 17;
    }

}