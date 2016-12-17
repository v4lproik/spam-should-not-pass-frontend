import Client from '../client/Platform';

class MemberInformationService {

    constructor() {
        this.defaultPermission = "REGULAR";
        this.defaultStatus = "USER";

        this.base = '/user';
    }

    info(token) {

        var url = this.base + "/info";

        return Client.postSync(url, {}, token).then(function(data) {

            if (typeof data.user !== undefined) {
                data.user.token = {};
                data.user.token = token;

                return data.user;
            }

            return null;
        }).catch(function(err) {
            throw err;
        });
    }

    create(firstname, lastname, email, corporation, password) {

        var url = this.base + "/create";
        var data = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
            "corporation": corporation,
            "permission": this.defaultPermission,
            "status": this.defaultStatus
        };

        return Client.postSync(url, data, null).catch(function(err) {
            throw err;
        });
    }
}

export default new MemberInformationService()
