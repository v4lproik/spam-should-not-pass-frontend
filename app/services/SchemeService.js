import LoginStore from '../stores/LoginStore';
import Client from '../client/Platform';

class SchemeService {

    constructor(){
    }

    schemeSpam(userId, token) {

        var url = "/spam/all";
        var data ={'id': userId};

        return Client.postSync(url, data, token).then(function(data){
            console.log("info for scheme");
            console.log(data);

            if (typeof data.scheme !== undefined) {

                return data.scheme;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }

    schemeSpammer(userId, token) {

        var url = "/spammer/all";
        var data ={'id': userId};

        return Client.postSync(url, data, token).then(function(data){
            console.log("info for scheme");
            console.log(data);

            if (typeof data.scheme !== undefined) {

                return data.scheme;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }
}

export default new SchemeService()