import LoginStore from '../stores/LoginStore';
import Client from '../client/Platform';

class ContextService {

    constructor(){
    }

    list(token) {

        var url = "/context/list";

        return Client.postSync(url, {}, token).then(function(data){

            if (typeof data !== undefined) {

                return data.contexts;
            }

            return null;
        }).catch(function(err){
            throw err;
        });
    }

    add(name, token) {

        var url = "/context/create";
        var data = {"name": name};

        return Client.postSync(url, data, token)
            .then(function(data){
                if (typeof data.contexts[0] !== 'undefined') {

                    return data.contexts[0];
                }

                return null;
            })
            .catch(function(err){
            throw err;
        });
    }

    addRules(contextId, rules, token) {

        var url = "/context/add-rules";
        var data = {idContext: contextId, listRules: rules};

        return Client.postSync(url, data, token)
            .catch(function(err){
                throw err;
            });
    }

    getContextAndRules(contextId, token) {

        var url = "/context/get-and-rules";
        var data = {id: contextId};

        return Client.postSync(url, data, token)
            .then(function(data){
                if (typeof data.contexts[0] !== 'undefined') {

                    return data.contexts[0];
                }

                return null;
            })
            .catch(function(err){
                throw err;
            });
    }

    get(contextId, token) {

        var url = "/context/get";
        var data = {"id": contextId};

        return Client.postSync(url, data, token)
            .then(function(data){

                if (typeof data.contexts[0] !== 'undefined') {

                    return data.contexts[0];
                }

                return null;
            }).catch(function(err){
                throw err;
            });
    }

    delete(contextId, token) {

        var url = "/context/delete";
        var data = {"id": contextId};

        return Client.postSync(url, data, token)
            .catch(function(err){
                throw err;
            });
    }
}

export default new ContextService();