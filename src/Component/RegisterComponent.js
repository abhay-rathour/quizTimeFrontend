import React, { Component } from 'react';
import { Card, CardBody, Label, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Button, Col, CardDeck, CardText, CardHeader } from 'reactstrap';

//Registration Component To Handle Registration Forms

class Register extends Component {

    constructor(props) {
        super(props);

        //State Containing all the variables Going to be used for Designing and storing Form Data to Submit

        this.state = {
            isModal1Open: false,
            isModal2Open: false,
            reg_code: '',
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            agree: false
        };

        //Medthod Definitions to handle the various actions during filling the form

        this.toggleModal1 = this.toggleModal1.bind(this);
        this.toggleModal2 = this.toggleModal2.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    //Switches the Modal 1 for  Student Registration ON or OFF

    toggleModal1() {
        this.setState({
            isModal1Open: !this.state.isModal1Open
        });
    }

    //Switches the Modal 2 for  Administrator Registration ON or OFF

    toggleModal2() {
        this.setState({
            isModal2Open: !this.state.isModal2Open
        });
    }

    //  A input change method to keep state updated with user's input

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //A Submit Button to submit all the data entered during registration form to and send it to Server-side to Complete the process

    handleSubmit(event) {
        // console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-9">
                        
                        {/* Two card decks with two options to Submit the form depending upon the type of account user wants to create */}
                        <CardDeck>
                            <Card style={{ width: '18rem' }} className="border-primary text-center mb-5 mt-5">
                                <CardHeader className="bg-primary text-white">Test Takers</CardHeader>
                                <CardBody>
                                    <CardText>All test takers Register on link below:-</CardText>
                                    <Button onClick={this.toggleModal1} type="submit" color="primary">Register</Button>
                                </CardBody>
                            </Card>

                            <Card style={{ width: '18rem' }} className="border-danger text-center mb-5 mt-5">
                                <CardHeader className="bg-danger text-white">Administrators</CardHeader>
                                <CardBody>
                                    <CardText>All Admin Register on link below:-</CardText>
                                    <Button onClick={this.toggleModal2} type="submit" color="danger">Register</Button>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>

                {/* Student Registration Form */}

                <Modal isOpen={this.state.isModal1Open} toggle={this.toggleModal1}>
                    <ModalHeader toggle={this.toggleModal1}><strong>Sign up  free Student Account</strong></ModalHeader>
                    <ModalBody >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="reg_code" name="reg_code"
                                        placeholder="Registration Code"
                                        value={this.state.reg_code}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="username" name="username"
                                        placeholder="User Name"
                                        value={this.state.username}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={5}>
                                    <Input type="text" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange} />
                                </Col>
                                <Col md={5}>
                                    <Input type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="password" name="password"
                                        placeholder="Create Password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="primary">
                                        Register
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

                {/* Administrator Registration Form */}

                <Modal isOpen={this.state.isModal2Open} toggle={this.toggleModal2}>
                    <ModalHeader toggle={this.toggleModal2}><strong>Sign up for Administrator Account</strong></ModalHeader>
                    <ModalBody >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="username" name="username"
                                        placeholder="User Name"
                                        value={this.state.username}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={5}>
                                    <Input type="text" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange} />
                                </Col>
                                <Col md={5}>
                                    <Input type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="password" name="password"
                                        placeholder="Create Password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox"
                                        name="agree"
                                        checked={this.state.agree}
                                        onChange={this.handleInputChange} /> {' '}
                                    <strong>I accept all the terms & conditions of QUIZ TIME.</strong>
                                </Label>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="danger">
                                        Register
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

export default Register;