var Promise = require('promise');
import PlatformException from '../models/PlatformException.js';

class Platform{

    constructor(){
        "use strict";
        this.url = "http://localhost:8080";
    }

    postSync(url, data, token){

        return new Promise(
            function(resolve, reject) {
                "use strict";
                var headers = {};

                if(typeof token !== 'undefined'&& token !== null && token !== ''){
                    headers = {
                        'x-auth-token': token
                    };
                }

                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    contentType: 'application/json',
                    url: this.url + url,
                    data: JSON.stringify(data),
                    headers: headers
                })
                    .fail(function (exception) {
                        reject(new PlatformException(exception.status, exception.status, null, exception.statusText));
                    })
                    .done(function (results) {
                        // do some more processing and update results
                        if(results.status !== 'OK'){
                            console.error(results);
                            reject(new PlatformException.constructor(results.status, results.status, results.error, results.message));
                            //reject(new PlatformException(results.status, results.status, results.error, results.message));
                        }
                        resolve(results);
                    });

            }.bind(this));

    }
}

export default new Platform();