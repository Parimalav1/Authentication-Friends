import React from 'react';
import { axioswithAuth } from "../utils/axioswithAuth";

class FriendForm extends React.Component {
    state = {
        name: '',
        email: '',
        age: ''
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    addFriends = e => {
        e.preventDefault();
        axioswithAuth()
            .post("http://localhost:5000/api/friends", {
                name: this.state.name,
                email: this.state.email,
                age: this.state.age
            })
            .then(res => {
                this.props.getData();
            })
            .catch(err => console.log('ERROR'));
    };

    render() {
        return (
            <div className='friend-form'>
                <form onSubmit={this.addFriends}>
                    <input
                        placeholder='Name'
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input  
                        placeholder='Email'
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder='Age'
                        type='number'
                        name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                    />
                    <button className='Btn' onClick={this.addFriends}>Add a friend</button>
                    <br />
                    <br />
                    <br />
                </form>
            </div>
        )
    }
};

export default FriendForm;