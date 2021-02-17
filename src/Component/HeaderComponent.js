import React, { Component} from 'react';
import { Navbar, Nav, NavbarToggler,NavItem, Collapse,Jumbotron ,Form, FormGroup, Col, Input,Button,Modal,ModalHeader,ModalBody,Label} from 'reactstrap';
import { MDBBtn } from "mdbreact";
import { NavLink, Redirect } from 'react-router-dom';

//Navigation Bar Component of the page

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

        //If user is signed in  displaying his Navbar containing options to see tests, results and his own information

        if(this.props.authenticated.isAuthenticated){
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


        //Else displaying normal Navigation bar containing home, demo, about us and contact us


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

//Login Part of Header 


class LoginPart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            admin: false,
            isModalOpen:false
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
         this.handleLogout=this.handleLogout.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmitLogin(event) {
        var user={
            username : this.state.username,
            password: this.state.password,
            userType: this.state.admin?'admins':'users'
        };
        console.log(user);
        this.props.loginUser(user);
        // fetch('http://localhost:4000/login/',
        // {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(user)
        // })
        //console.log(user)
        this.toggleModal();
        event.preventDefault();
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleLogout(){
        this.props.logoutUser();
    }
    render(){
        //If logged in , Diplay UserName and Logout button

        if(this.props.authenticated.isAuthenticated){
            return(
                <div className="row align-items-center">
                    <div className=" white-text col-sm-2 ml-auto justify-contents-right">
                       <h4>{this.props.authenticated.user.firstName} </h4>
                    </div>
                    <div className="col-sm-2 justify-contents-left">
                        <Button  size="sm" onClick={this.handleLogout}> LogOut </Button>
                    </div>
                </div>
            );
        }

        //Else Display Form to login

        else{
            return(
                <div className="row "> 
                   <div  className="col-sm-2 ml-auto">
                        <Button onClick={this.toggleModal} color="primary">
                           Login
                        </Button>
                        </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><strong>Sign in</strong></ModalHeader>
                    <ModalBody >
                        <Form onSubmit={this.handleSubmitLogin}>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="username" name="username"
                                        placeholder="Username"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="password" id="password" name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox"
                                        name="admin"
                                        checked={this.state.agree}
                                        onChange={this.handleInputChange} /> {' '}
                                    <strong>Administrator Account</strong>
                                </Label>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="danger">
                                        Login
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                 </div>

            );
        }
    }
}


//Defines Header and Navigation Bar

class Header extends Component {

    render(){
      return(
    
            <div className = "deep-orange lighten-5">
                <Jumbotron className = "sunny-morning-gradient">
                    <div className="container">
                        <div className="row row-header align-items-center">
                            
                            {/* Adding Logo of Website */}

                            <div className="col-12 col-sm-2 ">
                                <img className="rounded-circle" src="assets/images/logo.jpg" height="80" width="80" alt="Quiz Time" />
                            </div>

                            {/* Name of the Website */}

                            <div className="col-12 col-sm-1 mr-auto">
                               <h1 className="white-text ">Quiz Time</h1> 
                            </div>

                            {/* Rendering Login part of Right Half of Header */}

                            <div className="col-12 col-sm-6">
                             <LoginPart authenticated= {this.props.authenticated} loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} />   
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                {/* Showing Header Just Below The Header */}

                <NavComp authenticated= {this.props.authenticated}/>   

                
            </div>
      );
    }
  }
  
  export default Header;