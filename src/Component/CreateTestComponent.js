import React, { Component } from 'react';
import { Button, Col,  Label, Input, Form, FormGroup, Card, CardHeader, CardBody } from 'reactstrap';


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
                    <li key={question.number} className="col-12 m-5">
                        <h4> <b>{question.number}.&ensp;</b>
                            {question.question}
                        </h4>
                        <ul className="list-unstyled">
                            <li>A. &emsp;{question.option1}  </li>
                            <li>B. &emsp;{question.option2}  </li>
                            <li>C. &emsp;{question.option3}  </li>
                            <li>D. &emsp;{question.option4}  </li>
                            <li>Correct Option. &emsp;{question.answer}   </li>
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
            start_date: '',
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
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
            start_date: this.state.test.start_date,
            total_marks: this.state.test.totalmarks + this.state.marks
        }
        const question = {
            number: this.state.questionstotal + 1,
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            marks: this.state.marks,
            answer: this.state.answer
        }
        console.log("Current question is " + JSON.stringify(question));
        console.log("Current test  is " + JSON.stringify(testnew));
        testnew.questions.push(question);
        console.log("Current after push is " + JSON.stringify(testnew));
        this.setState({
            test: testnew,
            questionstotal: this.state.questionstotal + 1,
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            marks: 1,
            answer: ''
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
            totalemarks: 0,
            start_date: this.state.start_date,
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
        this.props.history.push('/groupdetail');
        
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
                            <Label htmlFor="start_date" md={2}>Tentative Test Date </Label>
                            <Col md={10}>
                                <Input type="date" id="start_date" name="start_date" placeholder="Tentative Start Date" value={this.state.start_date} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Button type="submit" color="primary">Create</Button>
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
                            <Label htmlFor="option1" md={2}>A. </Label>
                            <Col md={10}>
                                <Input type="text" id="option1" name="option1" placeholder="Option A" value={this.state.option1} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="option2" md={2}>B. </Label>
                            <Col md={10}>
                                <Input type="text" id="option2" name="option2" placeholder="Option B" value={this.state.option2} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="option3" md={2}>C. </Label>
                            <Col md={10}>
                                <Input type="text" id="option3" name="option3" placeholder="Option C" value={this.state.option3} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="option4" md={2}>D.</Label>
                            <Col md={10}>
                                <Input type="text" id="option4" name="option4" placeholder="Option D" value={this.state.option4} onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="answer" md={2}>Correct Option. </Label>
                            <Col md={10}>
                                <Input type="text" id="answer" name="answer" placeholder="e.g. A" value={this.state.answer} onChange={this.handleInputChange} />
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
export default CreateTest;