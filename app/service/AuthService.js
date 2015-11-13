import LoginStore from '../stores/LoginStore';

class AuthService {

    login(username, password) {

        var datax = {"email": username, "password": password};

        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/user/auth',
            dataType: 'json',
            data: JSON.stringify(datax),
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                if (data.user !== null){

                    var user = {};
                    user = data.user;

                    user.token = {};
                    user.token = data.token;
                    LoginStore.setUser(user);

                    return true;
                }
                return false;
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
}

export default new AuthService()