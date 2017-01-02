import React from 'react';
import LoginStore from '../../../stores/LoginStore';
import ProfileService from '../../../services/ProfileService';

class ProfileIndex extends React.Component {

    constructor(props) {
        super(props);
        this.user = {};
    }

    componentWillMount() {
        let user = LoginStore.getUser();

        ProfileService.get(this.props.params.userId, user.token).then(function(data) {
            console.log('componentWillMount user : ');
            console.log(user);
            this.user = data.user;
            // this.setState({user: data.user});
        }.bind(this)).catch(function(err) {
            console.log(err);
        }.bind(this));
    }

    render() {

        return (
            <div>
                <section className="content-header">
                    <h1>
                        Profile
                    </h1>
                </section>

                <section className="content">
                    Test
                    {this.user.email}
                </section>
            </div>
        );
    }
}

export default ProfileIndex;
