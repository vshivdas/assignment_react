import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/home"
import Posts from "../components/posts"

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/posts" exact component={Posts} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Routes;
