import React, {Component } from 'react';


import {Switch, Route, Redirect,withRouter} from 'react-router-dom';

import{connect} from 'react-redux';

//Importing all the Components created so far

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Student from './StudentComponent';
import Exam from './ExamComponent';
import Register from './RegisterComponent';
import Admin from './AdminComponent';
import CreateTest from './CreateTestComponent';
import GroupDetail from './GroupDetailComponent';
import {loginUser,logoutUser} from '../redux/ActionCreators/LoginActions';
import {adminRegistration,userRegistration}   from '../redux/ActionCreators/RegisterActions';

//Adding Redux store with Main State

const mapStateToProps = state=>{
    return {
        tests: state.dishes,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch)=>({
    // fetchTests: ()=>{dispatch(fetchTests())}
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    adminRegistration: (user)=>dispatch(adminRegistration(user)),
    userRegistration: (user)=>dispatch(userRegistration(user)),
    
});




// Defines the whole front page and combines everything together


class Main extends Component {
    componentDidMount(){
        // this.props.fetchTests();
    }
    render(){
        const IsAuth = this.props.auth.isAuthenticated;

        // Homepage Component which returns normal homepage when Not logged in otherwise it displays My Tests section of Logged in user

        const HomePage = () => {
            if(this.props.auth.isAuthenticated)
            {
                if(this.props.auth.isAdmin)
                {
                    return(
                        <Redirect to={'/admin'}/>
                    );
                }
                else{

                    return(
                        <Redirect to={'/student'}/>
                    );
                }
                

            }
            else
            {
                return(
                    <Redirect to={'/'}/>
                );
            }
          }
        
        

        return(
            <div className="Body">
                   
                <Header authenticated={this.props.auth} loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}/>
               
                    {/* Defines Route path to all components */}
               
                <Switch>
                    <Route path="/"  exact component = {()=>{
                        if(IsAuth){
                            return(
                                <Redirect to ='/home'/>
                            )    
                        }
                        else{
                            return(
                                <Home/>
                            )
                        }
                    }}/>
                    <Route path="/home" exact component = {HomePage}/>
                    <Route path="/register" exact><Register userRegistration={this.props.userRegistration} adminRegistration={this.props.adminRegistration}/></Route>
                    <Route path="/student">{!IsAuth?<Redirect to="/"/>:<Student/>}</Route> 
                    <Route path="/admin" component={Admin} />
                    <Route path="/exam" component={Exam}/>
                    <Route path="/createtest" component={CreateTest}/>
                    <Route path="/groupdetail" component={GroupDetail}/>
                    <Redirect to ="/home" />
                </Switch>
               
                <Footer/>
            </div>
        );
    }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));