import React, { Component } from 'react';
import { Button, Col,  Label, Input, Form, FormGroup, Card, CardHeader, CardBody ,CardTitle,Modal,ModalHeader,ModalBody, CardText} from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl}from '../shared/baseUrl';
import moment from 'moment';


class EditTest extends Component {
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
            questionType:'1',
            test: [],
            isTestInitialised: false,
            questionstotal: 0,
            isModalOpen1: false,
            isModalOpen2: false,
            isModalEditOpen: false,
            isFetching:true,
        }
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleModal1=this.toggleModal1.bind(this);
        this.toggleModal2=this.toggleModal2.bind(this);
        this.toggleModalEdit=this.toggleModalEdit.bind(this);
        this.fetchTestwithID=this.fetchTestwithID.bind(this);
        this.handleEditTestDetails=this.handleEditTestDetails.bind(this);
        this.handleQuestionEdit=this.handleQuestionEdit.bind(this);
    }

    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1,
            questionType:this.state.test.testType,
        });
    }
    toggleModal2() {
        if(this.state.isModalOpen2)
        {
            this.setState({
                isModalOpen2: !this.state.isModalOpen2,
            })

        }
        else
        {
            const td=new Date(this.state.test.startDate);
            var date=moment.utc(td).local().format('YYYY-MM-DDTHH:mm');
            this.setState({
                isModalOpen2: !this.state.isModalOpen2,
                title: this.state.test.title,
                duration: this.state.test.duration,
                subject: this.state.test.subject,
                startDate: date,
            });
        }
        
    }
    toggleModalEdit(questionIndex) {
        if(this.state.isModalEditOpen)
        {
            this.setState({
                isModalEditOpen: !this.state.isModalEditOpen,
            })

        }
        else
        {
            const question=this.state.test.questions[questionIndex];
            this.setState({
                isModalEditOpen: !this.state.isModalEditOpen,
                question: question.question,
                A: question.A,
                B: question.B,
                C: question.C,
                D: question.D,
                marks: question.marks,
                ans: question.ans,
                questionIndex:questionIndex
            });
        }
        
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
        const question = {
            questionNo: this.state.test.questions.length+1,
            questionType:this.state.questionType,
            question: this.state.question,
            A: this.state.A,
            B: this.state.B,
            C: this.state.C,
            D: this.state.D,
            marks: this.state.marks,
            ans: this.state.ans,
            totalMarks:this.state.test.totalMarks
        }
        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl+'createtest/'+this.state.test._id+'/question', {
            method: "POST",
            body: JSON.stringify(question),
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
        .then(testrecieved => { console.log('Question Added in ', testrecieved); 
        this.setState({
            test: testrecieved,
            question: '',
            A: '',
            B: '',
            C: '',
            D: '',
            marks: 1,
            ans: '',
            isModalOpen1:false
        }); })
        .catch(error => console.log(error));
    }
    handleEditTestDetails(event) {
        event.preventDefault();
        const testnew = {
            title: this.state.title,
            duration: this.state.duration,
            subject:this.state.subject,
            // totalMarks: 0,
            startDate: this.state.startDate,
            testType:this.state.test.testType,
        };
        const bearer = 'Bearer ' + localStorage.getItem('token');
  
        fetch(baseUrl+'createtest/edit/'+this.state.test._id, {
            method: "PUT",
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
            this.setState({
                test: tests,
                isModalOpen2:false
            });
            // this.toggleModal2();
        })
        .catch(error => console.log(error));
    }
    handleQuestionEdit(event){
        event.preventDefault();
        var question={
            questionNo: this.state.questionIndex+1,
            question: this.state.question,
            A: this.state.A,
            B: this.state.B,
            C: this.state.C,
            D: this.state.D,
            marks: this.state.marks,
            ans: this.state.ans,
            totalMarks:this.state.test.totalMarks-this.state.test.questions[this.state.questionIndex].marks+this.state.marks
        }
        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl+'createtest/'+this.state.test._id+'/question', {
            method: "PUT",
            body: JSON.stringify(question),
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
        .then(testrecieved => { console.log('Question Added in ', testrecieved); 
        this.setState({
            test: testrecieved,
            question: '',
            A: '',
            B: '',
            C: '',
            D: '',
            marks: 1,
            ans: '',
            isModalEditOpen:false
        }); })
        .catch(error => console.log(error));
        
    }

    fetchTestwithID = (testId) => {
        const bearer= 'Bearer '+localStorage.getItem('token');
        this.setState({...this.state, isFetching: true});
        fetch(baseUrl+'createtest/' +testId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': bearer
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({test: result, isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
    };
    componentDidMount(){
        this.fetchTestwithID(this.props.match.params.testId);
    }
    



    render() {
        if(this.state.isFetching)
        {
            return(
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <h2>Loading Test.....</h2>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.test)
        {
            const test=this.state.test;
            console.log(this.state.test);
            var questionlist;
            if(test.questions.length)
            {
                questionlist=test.questions.map((question,index)=>{
                    if(question.questionType==='1')
                        return(
                            <Card className="mt-2">
                                <CardHeader as="h5" style={{backgroundColor:'rgba(0,186,0,0.5)'}}>Question : {index+1}<span style = {{position:'absolute',right:0}}><span  className="fa fa-edit fa-lg mr-5" onClick={(event)=>this.toggleModalEdit(index)}></span><span className="fa fa-trash fa-lg mr-2"onClick={this.handleQuestionDelete}></span></span></CardHeader>
                                <CardBody>
                                    <CardTitle>{question.question}</CardTitle>
                                    <CardText>
                                            A. &emsp;{question.A}  
                                            <br/>B. &emsp;{question.B}  
                                            <br/>C. &emsp;{question.C}  
                                            <br/>D. &emsp;{question.D}  
                                            <br/><br/>Correct Option. &emsp;{question.ans}   
                                            <br/>Marks. &emsp;{question.marks}   
                                    </CardText>    
                                </CardBody>
                            </Card>

                        );
                    else if(question.questionType==='2'||question.questionType==='3')
                        return(
                            <Card className="mt-2">
                                <CardHeader as="h5" style={{backgroundColor:'rgba(0,186,0,0.5)'}}>Question : {index+1}<span style = {{position:'absolute',right:0}}><span  className="fa fa-edit fa-lg mr-5" onClick={(event)=>this.toggleModalEdit(index)}></span><span className="fa fa-trash fa-lg mr-2"onClick={this.handleQuestionDelete}></span></span></CardHeader>
                                <CardBody>
                                    <CardTitle>{question.question}</CardTitle>
                                    <CardText> 
                                            <br/>Marks. &emsp;{question.marks}   
                                    </CardText>    
                                </CardBody>
                            </Card>

                        );
                    else{
                        return(
                            <>Unknown question type.</>
                        );
                    }
                        
                })

            }
            else
            {
                questionlist=(<h2>You Don't Have Any questions Yet! Add Some Questions Now!!!</h2>)
            }

            var testtype;
            if(test.testType==='1')
            {
                testtype="MCQ Only"
            }
            if(test.testType==='2')
            {
                testtype="MCQ + Fill in the blanks"
            }
            if(test.testType==='3')
            {
                testtype="Assignment Type"
            }
            var questionTypeInput= this.state.test.testType==='2'?(<>
                <FormGroup row>
                    <Label htmlFor="testType" md={2}>Question type </Label>
                    <Col md={10}>
                        <Input type="select" id="questionType" name="questionType" value={this.state.questionType} onChange={this.handleInputChange} >
                        <option value='1'>MCQ </option>
                        <option value='2'>Fill in the blanks</option>
                        </Input>
                    </Col>
                </FormGroup></>):(<>
                </>);
            var optionInput=this.state.questionType==='1'?(<><FormGroup row>
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
            </FormGroup></>):(<></>);

            return (
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <Card className="mt-2">
                            <CardHeader as="h5" className="bg-warning">Test Details</CardHeader>
                                <CardBody>
                                    <CardTitle>Title: &emsp;{test.title}
                                        <br/>Subject:  &emsp;{test.subject}
                                        <br/>Duration: &emsp;{test.duration} (in min)
                                        <br/>Start Date: &emsp;{moment.utc(test.startDate).local().format('llll')}
                                        <br/>Test Type : &emsp;{testtype}
                                    </CardTitle>
                                </CardBody>
                            </Card>
                            <Card className="mb-5 mt-5 ">
                            <CardHeader as="h5" className="bg-info text-white text-center">
                               Questions
                            </CardHeader>
                            <CardBody>
                                {/* <ul className="list-unstyled"> */}
                                        {questionlist}
                                {/* </ul> */}
                            </CardBody>
                         </Card>
                            <Button  onClick={this.toggleModal1} type="submit" color="primary" >Add</Button>
                            <Button  onClick={this.toggleModal2} type="submit" color="primary" >Edit Test Details</Button>
                            <Link to={`/admingroups/${this.props.match.params.groupId}`}><Button type="submit" color="success">Finish</Button></Link>
                        </div>
                     </div>


                    <Modal className="modal-lg" isOpen={this.state.isModalOpen1} toggle={this.toggleModal1}>
                        <ModalHeader toggle={this.toggleModal1}><strong>Add Question</strong></ModalHeader>
                        <ModalBody >
                            <Form onSubmit={this.handleAddSubmit}>
                                {questionTypeInput}
                                <FormGroup row>
                                    <Label htmlFor="question" md={2}>Question. </Label>
                                    <Col md={10}>
                                        <Input type="text" id="question" name="question" placeholder="Question" value={this.state.question} onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                {optionInput}
                                <FormGroup row>
                                    <Label htmlFor="marks" md={2}>Marks. </Label>
                                    <Col md={10}>
                                        <Input type="number" id="marks" name="marks" placeholder="Default is 1" value={this.state.marks} onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Button type="submit" color="primary" >Add</Button>
                                </FormGroup>
                            </Form> 
                        </ModalBody>
                    </Modal>

                    <Modal className="modal-lg" isOpen={this.state.isModalOpen2} toggle={this.toggleModal2}>
                        <ModalHeader toggle={this.toggleModal2}><strong>Edit Test Details</strong></ModalHeader>
                        <ModalBody >
                            <Form onSubmit={this.handleEditTestDetails}>
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
                                    <Button  type="submit" color="primary">Save Changes</Button>
                                </FormGroup>
                            </Form>    
                        </ModalBody>
                    </Modal>
                    <Modal className="modal-lg" isOpen={this.state.isModalEditOpen} toggle={this.toggleModalEdit}>
                        <ModalHeader toggle={this.toggleModal1}><strong>Edit Question</strong></ModalHeader>
                        <ModalBody >
                            <Form onSubmit={this.handleQuestionEdit}>
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
                                    <Button type="submit" color="primary" >Save Changes</Button>
                                </FormGroup>
                            </Form> 
                        </ModalBody>
                    </Modal>

                </div>
            )
        }
        else{
            return(
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12">
                            <h2>Failed To Load...</h2>
                        </div>
                    </div>
                </div>
            )
        }
       
    }
}
export default EditTest;