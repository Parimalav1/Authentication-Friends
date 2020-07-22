import React from "react";
// import moment from "moment";
import Loader from "react-loader-spinner";

import { axioswithAuth } from "../utils/axioswithAuth";
import Friend from './Friend';
import FriendForm from "./FriendForm";

class FriendsList extends React.Component {
    state = {
        friends: [],
        fetchingData: true
    };

    componentDidMount() {
        this.getData();
        //this.getFriend();
        //this.deleteFriend();
    };

    getData = () => {
        //this.state.fetchingData = true;
        this.setState({
            ...this.state,
            fetchingData: true
        });
        axioswithAuth()
            .get("http://localhost:5000/api/friends")
            .then(res => {
                // res.data.data
                this.setState({
                    friends: res.data,
                    fetchingData: false
                });
                // .filter(
                //     price =>
                //         price.location === "US" || price.location === "State of Hawaii"
                // )
                // .filter(price => price.type === "Gasoline - Regular")
                //     or
                //.filter(
                //  price => price.type === 'Gasoline - Regular' && (price.location === 'US' || 'State of Hawaii')
            })
            .catch(err => console.log(err));
    };

    getFriend = () => {
        axioswithAuth()
            .get('http://localhost:5000/api/friends/:id')
            .then(res => {
                this.setState({
                    friends: res.data,
                    fetchingData: false
                });
            })
            .catch(err => console.log(err));
    };


    deleteFriend = () => {
        axioswithAuth()
            .delete('http://localhost:5000/api/friends/:id')
            .then(res => {
                this.setState({
                    friends: res.data
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <h1>FRIENDS</h1>
                {this.state.fetchingData && (
                    <div className="key spinner">
                        <Loader type="Puff" color="#204963" height="60" width="60" />
                        <p>Loading Data</p>
                    </div>
                )}
                {this.state.friends.map(x =>
                    <div key={x.id} className='friends-list'>
                        <Friend key={x.id} friend={x} getData={this.getData} />
                    </div>
                )}
                <FriendForm getData={this.getData}/>
            </div>
        )
    }
};

export default FriendsList;