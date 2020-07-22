import React from 'react';
import { axioswithAuth } from '../utils/axioswithAuth';

class Friend extends React.Component {
    state = {
        name: '',
        email: '',
        age: '',
        isUpdating: false
    };

    updateFriend = (e) => {
        e.preventDefault();
        axioswithAuth()
            .put(`http://localhost:5000/api/friends/${this.props.friend.id}`, {
                name: this.state.name,
                email: this.state.email,
                age: this.state.age
            })
            .then(res => {
                this.props.getData();
                this.setState({
                    ...this.state,
                    isUpdating: false
                })
            })
            .catch(err => console.log('ERROR'));
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleEdit = e => {
        this.setState(
            {
                ...this.state,
                isUpdating: true
            }
        )
    }

    render() {
        return (
            <div className='friend'>
                <h2>{this.props.friend.name}<br /></h2>
                <p>Email: {this.props.friend.email}<br /></p>
                <p>Age: {this.props.friend.age}</p>
                {
                    this.state.isUpdating && (
                        <form onSubmit={this.updateFriend}>
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
                            <button className='Btn'>Update</button>
                        </form>
                    )
                }
                {
                    !this.state.isUpdating && (
                        <button className='Btn' onClick={this.handleEdit}>Edit</button>
                    )
                }
            </div>
        )
    }
};

export default Friend;