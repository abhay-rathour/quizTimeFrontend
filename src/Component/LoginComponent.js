import React, { Component} from 'react';
import { connect } from 'react-redux';
import {  Card, CardBody, CardHeader,Form, FormGroup, Col, Input,Button,Label} from 'reactstrap';
import {loginUser}from '../redux/ActionCreators/LoginActions';

const mapDispatchToProps=(dispatch)=>({
    loginUser: (creds) => dispatch(loginUser(creds)),
    
});

class Login extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            admin: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    };
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    async handleSubmitLogin(event) {
        var user={
            username : this.state.username,
            password: this.state.password,
            userType: this.state.admin?'admins':'users'
        };
        event.preventDefault();
        console.log(user);
        this.props.loginUser(user);  
        this.props.history.push('/'); 
    }
    render(){
            return(
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>    
                        <Card className="mb-5 md-5 mt-5">
                            <CardHeader className="bg-info text-white text-center">Sign In</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleSubmitLogin}>
                                    <FormGroup row>
                                        <Col md={10} >
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
                            </CardBody>
                        </Card>
                    </div>
                </div>
              </div>
            );
    }
}
export default connect(null,mapDispatchToProps)(Login);