import LoginStore from '../stores/LoginStore';
import Client from '../client/Platform';

class MemberInformationService {

    constructor(){
        this.defaultPermission = "REGULAR";
        this.defaultStatus     = "USER";
    }

    info(token) {

        var url = "/user/info";

        return Client.postSync(url, null, token).then(function(data){
            console.log(data);
            if (typeof data.user !== undefined) {
                return data.user;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }

    create(firstname, lastname, email, corporation, password) {

        console.log("Create user");

        var url = "/user/create";
        var data = {"firstname": firstname, "lastname": lastname, "email": email, "password": password, "corporation": corporation, "permission": this.defaultPermission, "status": this.defaultStatus};

        return Client.postSync(url, data, null).then(function(data){
            if (typeof data.user !== undefined) {
                return data;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }
}

export default new MemberInformationService()