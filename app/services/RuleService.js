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

    get(ruleID, token) {

        var url = "/rule/get";
        var data = {"id": ruleID};

        return Client.postSync(url, data, token)
            .then(function(data){

                if (typeof data.rules[0] !== 'undefined') {

                    return data.rules[0];
                }

                return null;
            }).catch(function(err){
                throw err;
            });
    }

    delete(ruleID, token) {

        var url = "/rule/delete";
        var data = {"id": ruleID};

        return Client.postSync(url, data, token)
            .catch(function(err){
                throw err;
            });
    }
}

export default new RuleService()