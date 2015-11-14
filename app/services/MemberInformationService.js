import LoginStore from '../stores/LoginStore';
import Client from '../client/Platform';

class MemberInformationService {

    info(token) {

        var url = "/user/info";

        return Client.postSync(url, null, token).then(function(data){
            if (typeof data.user !== undefined) {
                return data.user;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }
}

export default new MemberInformationService()