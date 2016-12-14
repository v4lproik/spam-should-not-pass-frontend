class SessionService {

    constructor() {
        this.sessionTimeValidityInMinute = 60;
        this.sessionTimeValidity = this.sessionTimeValidityInMinute * 60 * 1000;
    }

    isValid(lastUpdate) {
        var rightNow = new Date();
        var lastAccess = new Date(lastUpdate);
        lastAccess.setTime(lastAccess.getTime() + this.sessionTimeValidity);

        if (rightNow > lastAccess) {
            return false;
        } else {
            return true;
        }
    }
}

export default new SessionService()
