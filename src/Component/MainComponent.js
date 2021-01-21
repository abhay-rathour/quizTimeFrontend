import React, {Component } from 'react';


import {Switch, Route, Redirect,withRouter} from 'react-router-dom';

import{connect} from 'react-redux';


import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Student from './StudentComponent';
import Exam from './ExamComponent';



const mapStateToProps = state=>{
    return {
        tests: state.dishes,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch)=>({
    // fetchTests: ()=>{dispatch(fetchTests())}
});




// Defines the whole front page and combines everything together


class Main extends Component {
    componentDidMount(){
        // this.props.fetchTests();
    }
    render(){
        const HomePage = () => {
            if(this.props.auth.isAuthenticated)
            {
            
                return(
                    <Redirect to={'/student'}/>
                );
            }
            else
            {
                return(
                    <Home/>
                );
            }
          }
        return(
            <div className="Body">
                    {/* authenticated={ true} displays header if user is logged in else normal header*/}
                <Header authenticated={this.props.auth}/>
               
                    {/* Defines Route path to all components */}
               
                <Switch>
                    <Route path="/home" component = {HomePage}/>
                    <Route path="/student" component={Student} />
                    <Route path="/exam" component={Exam}/>
                    <Redirect to ="/home" />
                </Switch>
               
                <Footer/>
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));