import Client from '../client/Platform';

class AuthService {

    constructor(){
        this.base = '/user';
    }

    login(username, password) {

        var url = this.base + "/auth";

        var data = {"email": username, "password": password};
        var token = null;

        return Client.postSync(url, data, token)
            .then(function(data){

                if (typeof data.user !== undefined) {
                    var user = data.user;
                    user.token = {};
                    user.token = data.token;

                    console.log(user);

                    return user;
                }

                return null;
            })
            .catch(function(err){
                console.error(err);
                throw err;
            });
    }

    logout(token) {

        var url = this.base + "/logout";
        var data = null;

        return Client.postSync(url, data, token)
            .catch(function(err){
                console.error(err);
                throw err;
            });
    }
}

export default new AuthService()
