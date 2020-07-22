import React from "react";
import axios from "axios";
// import Loader from 'react-loader-spinner';

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: ""
        },
        isLoading: false
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/login", {
                username: this.state.credentials.username,
                password: this.state.credentials.password
            })
            .then(res => {
                // res.data.payload ==> localStorage
                // navigate user to the "protected" route
                localStorage.setItem('token', res.data.payload);
                this.props.history.push('/');
            })
            .catch(err => console.log('ERROR'));
    };

    render() {
        return (
            <div className='form'>
                <form onSubmit={this.login}>
                    <input
                        placeholder='Username'
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button className='Btn'>Log in</button>
                </form>
            </div>
        )
    }
};

export default Login;
