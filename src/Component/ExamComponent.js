import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardText, Form, Button, FormGroup, Input, Label } from 'reactstrap';
import { TEST } from '../shared/questions';
class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
        testDuration: TEST.duration,
        questions: TEST.questions,
        index: 0,
        disabledNext: false,
        disabledSubmit: true,
        score: 0,
        answers: [],
        time: {
         
        }
    };
    this.interval =null;
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.initialise = this.initialise.bind(this);
    this.startTimer= this.startTimer.bind(this);
  }
  handleOptionChange(event) {
    var pos = this.state.index;
    const newAnswers = this.state.answers.slice();
    newAnswers[pos] = event.target.value;
    this.setState({
      answers: newAnswers,
    });

  }
  componentDidMount() {
    this.initialise();
    this.startTimer();
  }
  initialise() {
    var ans = [];
    for (let i = 0; i < this.state.questions.length; i++) {
      ans = ans.concat('left');
    }
    this.setState({
      answers: ans
    })
  }


  toggleNext(e) {

    let index = this.state.index + 1;
    let disabledNext = index === (this.state.questions.length - 1);
    let disabledPrev = (index === 0);
    let disabledSubmit = !(index === (this.state.questions.length - 1));
    this.setState({ index: index, disabledNext: disabledNext, disabledPrev: disabledPrev, disabledSubmit: disabledSubmit })
  }
  toggleSubmit(e) {
    const choices = this.state.answers.slice();
    const questions = this.state.questions;
    var score = 0;
    for (var i = 0; i < questions.length; i++) {
      if (choices[i] === questions[i].answer) {
        score++;
      }
    }
    this.setState({
      score: score
    })
    alert("Quiz has ended and Your Score is " + score);
    this.props.history.push('/');
  }

  startTimer =()=>{
    const countDownTime = Date.now()+(this.state.testDuration)*60000;
    this.interval=setInterval(()=>{
      const now = Date.now();
      const distance= countDownTime-now;
      var hours =Math.floor((distance%(1000*60*60*60))/(1000*60*60));
      var minutes =Math.floor((distance%(1000*60*60))/(1000*60));
      var seconds =Math.floor((distance%(1000*60))/(1000));
      if(hours<10)
      {
        hours= '0'+hours;
      }
      if(minutes<10)
      {
        minutes= '0'+minutes;
      }
      if(seconds<10)
      {
        seconds= '0'+seconds;
      }

      if(distance<0){
        clearInterval(this.interval);
        this.setState({
          time:{
            hour:0,
            min:0,
            sec: 0
          }
        },this.toggleSubmit());
      }
      else{
        this.setState({
          time:{
            hour:hours,
            min:minutes,
            sec: seconds
          }
        })
      }
    },1000);
  }

  render() {
    const { index, disabledNext,  disabledSubmit } = this.state;
    const question = this.state.questions ? this.state.questions[index] : null;
    // console.log("Answers array : " + this.state.answers);
    if (question) {
      return (
        <div className='container'>
          <div className="row justify-content-center mt-5"><h2>Time Left:- {this.state.time.hour}:{this.state.time.min}:{this.state.time.sec}</h2></div>
          <Card className="mb-5 mt-5">
            <CardHeader className="bg-info text-white text-center">{question.number} / {this.state.questions.length}</CardHeader>

          </Card>
          <CardBody>
            <CardText><h2> Q:- {question.question}</h2></CardText>
            <Form className="offset-md-1">
              <FormGroup row >
                <Label radio >
                  <Input type="radio" value="option1" checked={this.state.answers[index] === 'option1'} onChange={(event) => this.handleOptionChange(event)} />
                  {question.option1}
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label radio >
                  <Input type="radio" value="option2" checked={this.state.answers[index] === 'option2'} onChange={(event) => this.handleOptionChange(event)} />
                  {question.option2}
                </Label>
              </FormGroup>
              <FormGroup row>
                <Label radio >
                  <Input type="radio" value="option3" checked={this.state.answers[index] === 'option3'} onChange={(event) => this.handleOptionChange(event)} />
                  {question.option3}
                </Label>
              </FormGroup>
              <FormGroup row >
                <Label radio>
                  <Input type="radio" value="option4" checked={this.state.answers[index] === 'option4'} onChange={(event) => this.handleOptionChange(event)} />
                  {question.option4}
                </Label>
              </FormGroup>
            </Form>
            <div>
              <Next toggle={(e) => this.toggleNext(e)} active={disabledNext} />
              <Submit toggle={(e) => this.toggleSubmit(e)} disabled={disabledSubmit} />
            </div>
          </CardBody>
        </div>
      )
    } else {
      return <span>Error</span>
    }
  }
}



function Next(props) {
  return (
    <Button color="primary" onClick={props.toggle} disabled={props.active}>Next</Button>
  );
}
function Submit(props) {
  return (
    <Button color="success" onClick={props.toggle} disabled={props.disabled}>Submit</Button>
  );
}



export default Test;