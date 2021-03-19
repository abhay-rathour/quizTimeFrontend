import React, { Component } from 'react';
import { Button, Col,  Label, Input, Form, FormGroup} from 'reactstrap';

import {baseUrl}from '../shared/baseUrl';

class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            duration: '',
            subject: '',
            startDate: '',
            test: [],
        }
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleCreateSubmit(event) {
        event.preventDefault();
        const testnew = {
            title: this.state.title,
            duration: this.state.duration,
            subject:this.state.subject,
            totalMarks: 0,
            startDate: this.state.startDate,
        };
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const groupID=this.props.match.params.groupId;
        fetch(baseUrl+'createtest/'+groupID, {
            method: "POST",
            body: JSON.stringify(testnew),
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
            },
            credentials: "same-origin"
        })
        .then(response => {
            if (response) {
                return response;
            } 
            else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
        .then(response => response.json())
        .then(tests => { console.log('Test Created', tests);
            this.props.history.push(`/edittest/${groupID}/${tests._id}`);
        })
        .catch(error => {console.log(error)});
    }
    



    render(){
            return(
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <Form onSubmit={this.handleCreateSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="title" md={2}>Title. </Label>
                                    <Col md={10}>
                                        <Input type="text" id="title" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="subject" md={2}>Subject. </Label>
                                    <Col md={10}>
                                        <Input type="text" id="subject" name="subject" placeholder="Subject" value={this.state.subject} onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="duration" md={2}>Duration. </Label>
                                    <Col md={10}>
                                        <Input type="text" id="duration" name="duration" placeholder="Duration in Minutes" value={this.state.duration} onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="startDate" md={2}>Tentative Test Date </Label>
                                    <Col md={10}>
                                        <Input type="datetime-local" id="startDate" name="startDate" placeholder="Tentative Start Date" value={this.state.startDate} onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Button disabled={(this.state.isTestInitialised)} type="submit" color="primary">Create</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            )
        }
}
export default CreateTest;