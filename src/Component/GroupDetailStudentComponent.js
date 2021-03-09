import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, } from 'reactstrap';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';


const mapDispatchToProps = (dispatch)=>({

    
});



class GroupDetailStudent extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activeTab: '1',
            isFetching:'false',
            group:null,
        };
    
        this.toggleTab = this.toggleTab.bind(this); 
        this.fetchGroupwithID=this.fetchGroupwithID.bind(this);
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab});
            }
    }
    fetchGroupwithID = (groupId) => {
        const bearer= 'Bearer '+localStorage.getItem('token');
        this.setState({...this.state, isFetching: true});
        fetch(baseUrl+'student/' +groupId+'/getTestByGroup', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': bearer
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(result => {
                this.setState({group: result, isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
    };

    componentDidMount(){
        this.fetchGroupwithID(this.props.match.params.groupId);
    }

    
    
    render(){
        if(this.state.isFetching)
        {
            return (
                <p>Loading Tests:-----</p>
            );
        }
        else{
            console.log(this.state.group.tests)
            const tests=this.state.group.tests;
            console.log(tests);
            var testslist;
            if(tests.length)
            {
                testslist=tests.map((test,index)=>{
                    if(test.isCompleted)
                    {
                        return(
                            <tr>
                                <td><span className="fa fa-file fa-lg"></span>{test.title}</td>
                                <td>{test.startDate} IST</td>
                                <td>{test.subject}</td>
                                <td>{test.duration}</td>
                                <td>{test.totalMarks}</td>
                                <td>
                                    <Link to={`/student/result/${test._id}`} ><MDBBtn gradient="aqua" size="sm">Results</MDBBtn></Link>
                                </td>
                            </tr>
    
                        );
                    }
                    else{
                        return(
                            <tr>
                                <td><span className="fa fa-file fa-lg"></span>{test.title}</td>
                                <td>{test.startDate} IST</td>
                                <td>{test.subject}</td>
                                <td>{test.duration}</td>
                                <td>{test.totalMarks}</td>
                                <td>
                                    <Link to = {`/exam/${this.state.group._id}/${test._id}`} ><MDBBtn gradient="aqua" size="sm">Start Test</MDBBtn></Link>
                                </td>
                            </tr>
    
                        );

                    }
                    
                    
                })
            }
            else
            {
                testslist='No tests Available Yet'
            }
            var grouptype=this.state.group.isPrivate?'Private':'Public';
            return (
                    <div className="container mt-5">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }}>
                                    Tests
                                    </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }}>
                                    Group Details
                                    </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Test Name</th>
                                                    <th>Start Date</th>
                                                    <th>Subject</th>
                                                    <th>Duration(in Minutes)</th>
                                                    <th>Total Marks</th>
                                                    <th>Start / Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {testslist}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
            
                            </TabPane>
                            
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                       <h5>Group Name: <strong>{this.state.group.name}</strong></h5>
                                       <h5>Group Type: {grouptype}
                                        </h5>
                                        <h5>
                                            Group ID: {this.state.group._id}
                                        </h5>
                                    </Col>
                                </Row>
            
                            </TabPane>
                        </TabContent>
                    </div>
            
            
            );
        }
        

    }
    
}

export default connect(null,mapDispatchToProps)(GroupDetailStudent);