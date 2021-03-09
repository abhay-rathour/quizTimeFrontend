import React, { Component } from 'react';
import {  Card, CardHeader, CardBody } from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';


class StudentResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test:{},
            isFetching:false
        }
    }
    componentDidMount(){
        const testId=this.props.match.params.testId;
        const bearer= 'Bearer '+localStorage.getItem('token');
        this.setState({...this.state, isFetching: true});
        fetch(baseUrl+'student/'+testId+'/getCompletedQuestions', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': bearer
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({test: result, isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });

    }

    render() {
        if(this.state.isFetching)
        {
            return(
                <>Loading-----</>
            )
        }
        else{
            const test=this.state.test;
            console.log(test);
            var questionlist;
            if(test.questions)
            {
                var markedAns=test.response.map((res)=>{
                    if(res.markedAns=="-1")
                    {
                        return "Unanswered"
                    }
                    else{
                        return res.markedAns
                    }

                })
                if (test.questions.length) 
                {
                    questionlist = test.questions.map((question,index) => {
                        return (
                            <li key={question.questionNo} className="col-10 m-5">
                                <h4> <b>{question.questionNo}.&ensp;</b>
                                    {question.question}
                                </h4>
                                <ul className="list-unstyled">
                                    <li>A. &emsp;{question.A}  </li>
                                    <li>B. &emsp;{question.B}  </li>
                                    <li>C. &emsp;{question.C}  </li>
                                    <li>D. &emsp;{question.D}  </li>
                                    <li>Weightage. &emsp;{question.marks}  </li>
                                    <li>Correct Option. &emsp;{question.ans}   </li>
                                    <li>Marked option. &emsp;{markedAns[index]}   </li>
                                </ul>
                                <hr/>
                            </li>
                            

                        );
                    })
                }
                else
                {
                    questionlist=(<>No Questions</>)
                }
            }
            else{
                questionlist=(<>Aabra ka Daabra</>)
            }
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 justify-content-center">
                        <Card className="mb-5 mt-5 ">
                            <CardHeader className="bg-info text-white text-center">
                                Marks Obtained: {test.marksObtained} / {test.totalMarks} 
                            </CardHeader>
                            <CardBody>
                                <ul className="list-unstyled">
                                        {questionlist}
                                </ul>
                            </CardBody>
                         </Card>

                        </div>

                    </div>
                   
                </div>
            )

        }
        
    }
}
export default StudentResult;