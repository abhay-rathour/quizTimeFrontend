import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table,Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import{connect} from 'react-redux'
import {joinGroup,fetchGroups}from '../redux/ActionCreators/GroupActions';

const mapStateToProps = state=>({
    groups:state.groups,
});

const mapDispatchToProps=(dispatch)=>({
joinGroup:(groupId,req)=>dispatch(joinGroup(groupId,req)),
fetchGroups:(access)=>dispatch(fetchGroups(access))

})
// Student Component to display The signed in Students List of oending tests and previous tests 

class Student extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            activeTab: '1',
            groupId:'',
            name:'',
            uniqueID:'',
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleJoinGroup = this.handleJoinGroup.bind(this);
        this.toggleTab = this.toggleTab.bind(this); 
    }
    componentDidMount(){
        this.props.fetchGroups('users')
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab});
            }
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleJoinGroup(event) {
        this.toggleModal();
        alert('The following Req will be Sent to join the Group: ' + this.state.groupId  );
        var req={
            name: this.state.name,
            uniqueID:this.state.uniqueID,
        }
        var groupId=this.state.groupId;
        this.props.joinGroup(groupId,req);
        event.preventDefault();
    }
    render()
    {
            const groups=this.props.groups.groups;
            var grouplist;
            if(groups)
            {
                grouplist=groups.map((group,index)=>{
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td><span className="fa fa-user fa-lg"></span>{group.name}</td>
                            <td>{group.creator.firstname}</td>
                            <td>{group.tests.length}</td>
                            <td><Link to={`/studentgroups/${group._id}`} ><MDBBtn gradient="aqua" size="sm">Details </MDBBtn></Link></td>
                        </tr>
                    );
                })
            }
            else{
                grouplist='You are not member of Any Group'
            }
        return (
            <div className="container mt-5">
    
                {/* A Navigation Tab to switch between old tests and new ones */}
    
    
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }}>
                            Groups
                            </NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }}>
                            New
                            </NavLink>
                    </NavItem> */}
                </Nav>
    
                {/* Contents of both tabs */}
    
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Group Name</th>
                                            <th>Created By</th>
                                            <th>Tests</th>
                                            <th>Group Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grouplist} 
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </TabPane>
    
    
                    {/* <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Test Name</th>
                                            <th>Start Time</th>
                                            <th>Subject</th>
                                            <th>Max.Duration</th>
                                            <th>Max.Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className="fa fa-file fa-lg"></span>TestA</td>
                                            <td>Jan 21,2021 9:00AM IST</td>
                                            <td>Maths</td>
                                            <td>00:60:00</td>
                                            <td>50
                                                <Link to="/exam" ><MDBBtn gradient="aqua" size="sm">Test</MDBBtn></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="fa fa-file fa-lg"></span>TestB</td>
                                            <td>Jan 28,2021 9:00AM IST</td>
                                            <td>Science</td>
                                            <td>00:60:00</td>
                                            <td>50
                                                <Link to="/exam" ><MDBBtn gradient="aqua" size="sm">Test</MDBBtn></Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </TabPane> */}
                </TabContent>
                <Button onClick={this.toggleModal} type="submit" color="light-blue">Join A Group</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><strong>Join A Group</strong></ModalHeader>
                    <ModalBody >
                        <Form onSubmit={this.handleJoinGroup}>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="groupId" name="groupId"
                                        placeholder="Group ID"
                                        value={this.state.groupId}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="uniqueID" name="uniqueID"
                                        placeholder="Unique ID"
                                        value={this.state.uniqueID}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            
                           

                            <FormGroup row >
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="outline-success" size="md" style={{float: 'right'}}>
                                        Send Request
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

export default connect(mapStateToProps,mapDispatchToProps)(Student);
