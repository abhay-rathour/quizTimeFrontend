import React, { Component } from 'react';
import { Button, Col,  Label, Input, Form, FormGroup} from 'reactstrap';
import axios from 'axios'
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
            testType:'1',
            papersubmit:false,
            selectedFile: null,
            isQuestionInPDF: false,
            totalQuestions:0,
            totalMarks:0
        }
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }
    handleFileChange(event){
        this.setState({ selectedFile: event.target.files[0] });
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
            startDate: this.state.startDate,
            testType:this.state.testType,
            isQuestionInPDF:this.state.papersubmit,
            totalQuestions:this.state.totalQuestions,
            totalMarks:this.state.totalMarks
        };

        var formData = new FormData()
        formData.append('file', this.state.selectedFile)

        const bearer = 'Bearer ' + localStorage.getItem('token');
        const groupID=this.props.match.params.groupId;
        
        fetch(baseUrl+'createtest/'+groupID, {
            method: "POST",
            body: JSON.stringify(testnew,formData),
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
            },
            credentials: "same-origin",
            // files:formData.
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
            if(this.state.papersubmit)
            {
                axios.post(baseUrl+'createtest/'+groupID+'/uploadAssignment/'+tests._id,formData).then(res => console.log(res)).catch(err => console.log(err));
                this.props.history.push(`/home`);

            }
            else
            {
                this.props.history.push(`/edittest/${groupID}/${tests._id}`);
            }   
            
        })
        .catch(error => {console.log(error)});
    }
    



    render(){

            var paper=this.state.testType==='3'?(<>
            <FormGroup check>
                <Label check>
                <Input type="checkbox"
                        name="papersubmit"
                        checked={this.state.papersubmit}
                        onChange={this.handleInputChange} /> {' '}
                    <strong>I want to upload whole PDF of paper.</strong>
                </Label>
            </FormGroup></>):(<></>);
            var fileupload=this.state.papersubmit?(
            <>  <FormGroup row>
                    <Label htmlFor="totalQuestions" md={2}>No. of Questions. </Label>
                    <Col md>
                        <Input type="number" id="totalQuestions" name="totalQuestions" placeholder="Total Number of Questions" value={this.state.totalQuestions} onChange={this.handleInputChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="totalMarks" md={2}>Total Marks. </Label>
                    <Col md>
                        <Input type="number" id="totalMarks" name="totalMarks" placeholder="Total Marks" value={this.state.totalMarks} onChange={this.handleInputChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                <input type='file' id="exampleFormControlFile1" name="paper"label="Paper" onChange={this.handleFileChange}/>
                </FormGroup>
                <FormGroup row>
                    <Button disabled={(this.state.isTestInitialised)} type="submit" color="primary">Submit</Button>
                </FormGroup>
            </>):(<>
                <FormGroup row>
                    <Button disabled={(this.state.isTestInitialised)} type="submit" color="primary">Create</Button>
                </FormGroup>
            </>);
            return(
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <Form onSubmit={this.handleCreateSubmit} enctype="multipart/form-data">
                                <FormGroup row>
                                    <Label htmlFor="title" md={2}>Title. </Label>
                                    <Col md={10}>
                                        <Input type="text" id="title" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} required/>
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
                                    <Label htmlFor="testType" md={2}>Test type </Label>
                                    <Col md={10}>
                                        <Input type="select" id="testType" name="testType" value={this.state.testType} onChange={this.handleInputChange} >
                                        <option value='1'>MCQ Only</option>
                                        <option value='2'>MCQ + Fill-ups</option>
                                        <option value='3'>Assignment type</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                {paper}
                                {fileupload}
                                {/* <FormGroup row>
                                    <Label htmlFor="testType" md={2}>Test type </Label>
                                    <Col md={10}>
                                        <Input type="select" id="testType" name="testType" value={this.state.testType} onChange={this.handleInputChange} >
                                        <option value='1'>MCQ Only</option>
                                        <option value='2'>MCQ + Fill-ups</option>
                                        <option value='3'>Assignment type</option>
                                        </Input>
                                    </Col>
                                </FormGroup> */}
                            </Form>
                        </div>
                    </div>
                </div>
            )
        }
}
export default CreateTest;