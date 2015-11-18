import LoginStore from '../stores/LoginStore';
import Client from '../client/Platform';
import PlatformException from '../models/PlatformException.js';

class AuthService {

    login(username, password) {

        var data = {"email": username, "password": password};
        var url = "/user/auth";
        var token = null;

        return Client.postSync(url, data, token)
            .then(function(data){

                if (typeof data.user !== undefined) {
                    console.log("Know user");
                    var user = data.user;
                    user.token = {};
                    user.token = data.token;

                    console.log(user);

                    return user;
                }

                console.log("Don't know user");
                return null;
            })
            .catch(function(err){
                console.error(err);
                throw err;
            });
    }

    logout(token) {

        var data = null;
        var url = "/user/logout";

        return Client.postSync(url, data, token)
            .catch(function(err){
                console.error(err);
                throw err;
            });
    }


}

export default new AuthService()