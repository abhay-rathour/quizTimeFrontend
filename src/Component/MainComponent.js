import React, {Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

class Main extends Component {
    render(){
        return(
            <div className="Body">
                <Header authenticated={false}/>
                <Switch>
                    <Route path="/home" component = {Home}/>
                    <Redirect to ="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }
}
export default Main;