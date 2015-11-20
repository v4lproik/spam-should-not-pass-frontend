var Promise = require('promise');
import PlatformException from '../models/PlatformException.js';

class Platform{

    constructor(){
        this.url = "http://localhost:8080";
    }

    postSync(url, data, token){

        return new Promise(
            function(resolve, reject) {
                var headers = {};

                if(typeof token !== 'undefined'&& token !== null && token !== ''){
                    headers = {
                        "x-auth-token": token
                    };
                }

                var promise = $.ajax({
                    type: 'POST',
                    headers: headers,
                    async: false,
                    cache: false,
                    contentType: 'application/json',
                    url: "http://localhost:8080" + url,
                    data: JSON.stringify(data),
                    dataType: 'json'
                });

                promise.done(function (results) {
                    // do some more processing and update results
                    if(results.status !== 'OK'){
                        console.error(results);
                        reject(new PlatformException.constructor(results.status, results.status, results.error, results.message));
                    }
                    console.log(results);
                    resolve(results);
                });

                promise.fail(function (exception) {
                    console.error(exception);
                    reject(new PlatformException.constructor(exception.status, exception.status, null, exception.statusText));
                });

            });

    }
}

export default new Platform();