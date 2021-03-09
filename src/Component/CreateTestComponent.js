import React, { Component } from 'react';
import { Button, Col,  Label, Input, Form, FormGroup, Card, CardHeader, CardBody } from 'reactstrap';
import {connect} from 'react-redux';
import{createTest}from '../redux/ActionCreators/GroupActions'
const mapDispatchToProps=(dispatch)=>({
    createTest:(groupId,test)=>dispatch(createTest(groupId,test))
})

function RenderQuestions(props) {
    if (!props.isTestInitialised) {
        return (
            <>
            </>
        )

    }
    else {
        var questiondisplay;
        if (props.test.questions.length) {
            questiondisplay = props.test.questions.map((question) => {
                return (
                    <li key={question.questionNo} className="col-12 m-5">
                        <h4> <b>{question.questionNo}.&ensp;</b>
                            {question.question}
                        </h4>
                        <ul className="list-unstyled">
                            <li>A. &emsp;{question.A}  </li>
                            <li>B. &emsp;{question.B}  </li>
                            <li>C. &emsp;{question.C}  </li>
                            <li>D. &emsp;{question.D}  </li>
                            <li>Correct Option. &emsp;{question.ans}   </li>
                            <li>Marks. &emsp;{question.marks}   </li>
                        </ul>
                    </li>

                );
            })

        }
        else {
            questiondisplay = "You haven't added any questions yet";
        }


        return (
            <Card className="col-md-8 mb-5 mt-5 ">
                <CardHeader className="bg-info text-white text-center">
                    {props.test.title} / {props.test.duration} minutes
                </CardHeader>
                <CardBody>
                    <ul className="list-unstyled">
                        {questiondisplay}
                    </ul>
                </CardBody>
            </Card>
        );

    }

}


class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            duration: '',
            subject: '',
            startDate: '',
            question: '',
            A: '',
            B: '',
            C: '',
            D: '',
            ans: '',
            marks: 1,
            test: [],
            isTestInitialised: false,
            questionstotal: 0
        }
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleAddSubmit(event) {
        event.preventDefault();
        const testnew = {
            title: this.state.test.title,
            duration: this.state.test.duration,
            questions: this.state.test.questions,
            subject: this.state.test.subject,
            startDate: this.state.test.startDate,
            totalMarks: Number(this.state.test.totalMarks) +  Number(this.state.marks)
        }
        const question = {
            questionNo: this.state.questionstotal + 1,
            question: this.state.question,
            A: this.state.A,
            B: this.state.B,
            C: this.state.C,
            D: this.state.D,
            marks: this.state.marks,
            ans: this.state.ans
        }
        console.log("Current question is " + JSON.stringify(question));
        console.log("Current test  is " + JSON.stringify(testnew));
        testnew.questions.push(question);
        console.log("Current after push is " + JSON.stringify(testnew));
        this.setState({
            test: testnew,
            questionstotal: this.state.questionstotal + 1,
            question: '',
            A: '',
            B: '',
            C: '',
            D: '',
            marks: 1,
            ans: ''
        });
        console.log("Current State after Update is " + JSON.stringify(this.state.test));

    }
    componentDidMount(){
        alert("To Create Test Fill First Form and Click on Create button, then After this You can add questions 1 by 1 and then Finish the test to save it.")
    }
    handleCreateSubmit(event) {
        event.preventDefault();
        const testnew = {
            title: this.state.title,
            duration: this.state.duration,
            subject:this.state.subject,
            totalMarks: 0,
            startDate: this.state.startDate,
            questions: []
        };
        this.setState({
            test: testnew,
            isTestInitialised: true
        });

    }
    handleFinish(event) {
        event.preventDefault();
        alert("The Following Paper will be Submitted " + JSON.stringify(this.state.test));
        const groupId=this.props.groupId;
        const test= this.state.test;
        this.props.createTest(groupId,test);
        // this.props.history.push('/groupdetail');
        
    }



    render() {
        return (<div className="container">
            
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


                    <Form onSubmit={this.handleAddSubmit}>
                        <FormGroup row>
                            <Label htmlFor="question" md={2}>Question. </Label>
                            <Col md={10}>
                                <Input type="text" id="question" name="question" placeholder="Question" value={this.state.question} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="A" md={2}>A. </Label>
                            <Col md={10}>
                                <Input type="text" id="A" name="A" placeholder="Option A" value={this.state.A} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="B" md={2}>B. </Label>
                            <Col md={10}>
                                <Input type="text" id="B" name="B" placeholder="Option B" value={this.state.B} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="C" md={2}>C. </Label>
                            <Col md={10}>
                                <Input type="text" id="C" name="C" placeholder="Option C" value={this.state.C} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="D" md={2}>D.</Label>
                            <Col md={10}>
                                <Input type="text" id="D" name="D" placeholder="Option D" value={this.state.D} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="ans" md={2}>Correct Option. </Label>
                            <Col md={10}>
                                <Input type="text" id="ans" name="ans" placeholder="e.g. A" value={this.state.ans} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="marks" md={2}>Marks. </Label>
                            <Col md={10}>
                                <Input type="number" id="marks" name="marks" placeholder="Default is 1" value={this.state.marks} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Button disabled={!(this.state.isTestInitialised)} type="submit" color="primary" >Add</Button>
                        </FormGroup>
                    </Form>

                </div>


            </div>

            <div className="row justify-content-center">
                <RenderQuestions test={this.state.test} isTestInitialised={this.state.isTestInitialised} />
            </div>

            <div className="row justify-content-center">
                <Button type="submit" color="success" disabled={(!this.state.isTestInitialised) || (this.state.test.questions.length < 1)} onClick={this.handleFinish}>Finish</Button>
            </div>

        </div>
        

        )
    }
}
export default connect(null,mapDispatchToProps)(CreateTest);