import LoginStore from '../stores/LoginStore';
import Client from '../client/Platform';

class RuleService {

    constructor(){
    }

    list(token) {

        var url = "/rule/list";

        return Client.postSync(url, {}, token).then(function(data){

            if (typeof data !== undefined) {

                return data.rules;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }

    add(rule, token) {

        var url = "/rule/create";
        var data = {"name": rule.name, "type": rule.type, "rule": rule.rule};

        return Client.postSync(url, data, token)
            .catch(function(err){
            throw err;
        });
    }
}

export default new RuleService()