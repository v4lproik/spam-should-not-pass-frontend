import LoginStore from '../stores/LoginStore';
import Client from '../client/Platform';

class SchemeService {

    constructor(){
        this.base = '/scheme';
    }

    getDocument(userId, token) {

        var url = this.base + "/get/document";
        var data ={'id': userId};

        return Client.postSync(url, data, token).then(function(data){
            console.log("info for spammer scheme");
            console.log(data);

            if (typeof data.scheme !== undefined) {
                data.scheme.properties = JSON.parse(data.scheme.properties);
                return data.scheme;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }

    getUser(userId, token) {

        var url = this.base + "/get/user";
        var data ={'id': userId};

        return Client.postSync(url, data, token).then(function(data){
            console.log("info for spammer scheme");
            console.log(data);

            if (typeof data.scheme !== undefined) {
                data.scheme.properties = JSON.parse(data.scheme.properties);
                return data.scheme;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }

    addUser(scheme, token) {

        var url = this.base + "/create/user";
        var data ={'properties': scheme};

        return Client.postSync(url, data, token)
            .catch(function(err){
            throw err;
        });
    }

    addDocument(scheme, token) {

        var url = this.base + "/create/document";
        var data ={'properties': scheme};

        return Client.postSync(url, data, token)
            .catch(function(err){
                throw err;
            });
    }
}

export default new SchemeService()