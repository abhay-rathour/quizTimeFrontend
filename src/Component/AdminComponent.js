import React, {Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Label, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { MDBBtn} from 'mdbreact';
import { Link } from 'react-router-dom';
import classnames from 'classnames';


class Admin extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            group_name: '',
            activeTab: '1',
            private: false,
        };
    
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleTab = this.toggleTab.bind(this);

       
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

    handleSubmit(event) {
        this.toggleModal();
        alert('The following group will be Initailised Name: ' + this.state.group_name + ' Private: '+ this.state.private );
        event.preventDefault();
    }


    render(){
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
                            Your Group
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
                                            <th>Attempted By</th>
                                            <th>Avg Score</th>
                                            <th>Duration</th>
                                            <th>Passed</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className="fa fa-file fa-lg"></span>TestA</td>
                                            <td>30/40</td>
                                            <td>9.7/11</td>
                                            <td>00:60:00</td>
                                            <td>25/40</td>
                                            <td><Link to="#" ><MDBBtn gradient="aqua" size="sm"> Click </MDBBtn></Link></td>
                                        </tr>
                                        <tr>
                                            <td><span className="fa fa-file fa-lg"></span>TestB</td>
                                            <td>35/40</td>
                                            <td>9.0/11</td>
                                            <td>00:60:00</td>
                                            <td>27/40</td>
                                            <td><Link to="/testdetails" ><MDBBtn gradient="aqua" size="sm"> Click </MDBBtn></Link></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                            </Col>
                        </Row>
    
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Group Name</th>
                                            <th>Total Members</th>
                                            <th>Add New Members</th>
                                            <th>Total Tests</th>
                                            <th>Create New Test</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className="fa fa-user fa-lg"></span>Std 12</td>
                                            <td>40</td>
                                            <td><Link to="/addNew" ><MDBBtn gradient="aqua" size="sm"> Add </MDBBtn></Link></td>
                                            <td>5</td>
                                            <td><Link to="/createtest" ><MDBBtn gradient="aqua" size="sm"> Create </MDBBtn></Link></td>
                                            <td><Link to="/groupdetail" ><MDBBtn gradient="aqua" size="sm">Details </MDBBtn></Link></td>
                                        </tr>
                                        <tr>
                                        <td><span className="fa fa-user fa-lg"></span>Std 11</td>
                                            <td>35</td>
                                            <td><Link to="/addNew" ><MDBBtn gradient="aqua" size="sm"> Add </MDBBtn></Link></td>
                                            <td>6</td>
                                            <td><Link to="/createtest" ><MDBBtn gradient="aqua" size="sm"> Create </MDBBtn></Link></td>
                                            <td><Link to="/groupdetail" ><MDBBtn gradient="aqua" size="sm">Details </MDBBtn></Link></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button onClick={this.toggleModal} type="submit" color="light-blue">Create Group</Button>
                            </Col>
                        </Row>
                    </TabPane>
                    {/* <TabPane tableId="3">
                        <Row>
                            <Col sm="12">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane> */}
                </TabContent>

                                {/* Create Group Form */}

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><strong>New Group</strong></ModalHeader>
                    <ModalBody >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col md={10}>
                                    <Input type="text" id="group_name" name="group_name"
                                        placeholder="Group Name"
                                        value={this.state.group_name}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row>
                                <div className="col-md-10">
                                    <select className="browser-default custom-select">
                                         <option>Group Type</option> 
                                        <option value="1">Public</option>
                                        <option value="2">Private</option>
                                    </select>
                                </div>
                            </FormGroup> */}
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox"
                                        name="private"
                                        checked={this.state.private}
                                        onChange={this.handleInputChange} /> {' '}
                                        <strong> Create a Private Group</strong>
                                        <p>Private group enables users with  group ID Code to send Join Request , Public group (default) enable users to directly join with group ID code.</p>
                                </Label>
                            </FormGroup>

                            <FormGroup row >
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="outline-success" size="md" style={{float: 'right'}}>
                                        Create
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

export default Admin;
