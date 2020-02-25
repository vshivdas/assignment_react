import React, { Component } from 'react';
import Header from "../views/layouts/header";
import axios from "axios";

class Posts extends Component {
    state = {
        data: []
    };
    componentDidMount() {
        axios.get(`/posts`)
            .then(res => {
                console.log(res, res.data);
                this.setState({
                    data: res.data.result
                })
            })
    }
    render() {
        if (this.state.data.length > 0) {
            return (<React.Fragment>
                <Header></Header>
                <div className="row">
                    <div className="container">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            {/* <h1><center>Posts</center></h1> */}
                            {this.state.data.map((obj, index) => (
                                <div class="jumbotron">
                                    <h3>Comment!</h3>
                                    <p>{obj.posts}</p>
                                    <div class="">
                                        <a href="" class="thumbnail">
                                            <img src={obj.imagepath} alt="..." />
                                        </a>
                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </React.Fragment>)
        } else {
            return (
                <React.Fragment>
                    <Header></Header>
                    <div className="row">
                        <div className="container">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                {/* <h1><center>Posts</center></h1> */}

                                <div class="jumbotron">
                                    <h3>...Loading</h3>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }

    }
}

export default Posts;
