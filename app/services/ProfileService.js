import Client from '../client/Platform';

class ProfileService {

    constructor() {
        this.base = '/user';
    }

    get(userId: string, token: string) {

        const url = this.base + "/info";

        return Client.postSync(url, null, token).then(function(user) {
            return user;
        }).catch(function(err) {
            throw err;
        });
    }
}

export default new ProfileService();
