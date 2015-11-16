class PlatformException {

    constructor(code, status, error, message){
        this.code = code;
        this.error = error;
        this.message = message;
        this.status = status;
    }

    setError(error){
        this.error = error;
    }

    setMessage(message){
        this.message = message;
    }

    setStatus(status){
        this.status = status;
    }

    setCode(code){
        this.code = code;
    }

    getName(){
        return this.name;
    }

    getMessage(){
        return this.message;
    }

    getStatus(){
        return this.status;
    }

    getCode(){
        return this.code;
    }

    toString(){
        return this.error + " " +
                this.message + " " +
                this.status;
    }
}

export default new PlatformException();