class PlatformException {

    constructor(name, message, status){
        this.name = name;
        this.message = message;
        this.status = status;
    }

    setName(name){
        this.name = name;
    }

    setMessage(message){
        this.message = message;
    }

    setStatus(status){
        this.status = status;
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

    toString(){
        return this.name + " " +
                this.message + " " +
                this.status;
    }
}

export default new PlatformException();