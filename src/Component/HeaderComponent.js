import React, { Component} from 'react';
import { Navbar, Nav, NavbarToggler,NavItem, Collapse,Jumbotron} from 'reactstrap';
import { MDBBtn } from "mdbreact";
import { NavLink } from 'react-router-dom';
class NavComp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    };
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    render(){
        if(this.props.authenticated){
            return(
                <Navbar expand className="juicy-peach-gradient">                  
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link pink-text" to="/tests">
                                    <span className="fa fa-tasks fa-lg"></span> My Tests
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link pink-text" to="#">
                                    <span className="fa fa-bar-chart fa-lg"></span> Results
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link pink-text" to="#">
                                    <span className="fa fa-info fa-lg"></span> Details
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar> 
            );
        }
        else{
            return(
                <Navbar expand className="juicy-peach-gradient">                  
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link pink-text" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link pink-text" to="/test">
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link pink-text" to="/paper">
                                        <span className="fa fa-desktop fa-lg"></span> Demo
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link pink-text" to="#">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>   

            );
        }
    }
}
class LoginPart extends Component{
    
    render(){
        if(this.props.authenticated){
            return(
                <div className="row align-items-center">
                    <div className=" white-text col-sm-2 ml-auto justify-contents-right">
                       <h4>Utkarsh</h4>
                    </div>
                    <div className="col-sm-2 justify-contents-left">
                        <MDBBtn gradient="young-passion" size="sm">LogOut</MDBBtn>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="row"> 
                    <div className="col-sm-4">
                        <div className="form-group">
                        <input type="username" className="form-control" placeholder="Enter Username" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                        <input type="password" className="form-control" placeholder="Enter Password" />
                        </div>
                    </div>
                    <div className="col-sm-2">
                            <MDBBtn gradient="peach" size="sm">Login</MDBBtn>
                    </div>  
                </div>

            );
        }
    }
}

class Header extends Component {

    render(){
      return(
    
            <div className = "deep-orange lighten-5">
                <Jumbotron className = "sunny-morning-gradient">
                    <div className="container">
                        <div className="row row-header align-items-center">
                            <div className="col-12 col-sm-2 ">
                                <img className="rounded-circle" src="assets/images/logo.jpg" height="80" width="80" alt="Quiz Time" />
                            </div>
                            <div className="col-12 col-sm-1 mr-auto">
                               <h2 className="white-text">Quiz Time</h2> 
                            </div>
                            <div className="col-12 col-sm-6">
                             <LoginPart authenticated= {this.props.authenticated}/>   
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <NavComp authenticated= {this.props.authenticated}/>   
            </div>
      );
    }
  }
  
  export default Header;