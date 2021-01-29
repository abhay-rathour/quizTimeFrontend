import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table } from 'reactstrap';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const Admin = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="container mt-5">
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                        Tests
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                        Your Group
                        </NavLink>
                </NavItem>
                
            </Nav>
            <TabContent activeTab={activeTab}>
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
                                        <td><Link to="/testdetails" ><MDBBtn gradient="aqua" size="sm"> Click </MDBBtn></Link></td>
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
                                        <td><Link to="/newTest" ><MDBBtn gradient="aqua" size="sm"> Create </MDBBtn></Link></td>
                                        <td><Link to="/groupdetails" ><MDBBtn gradient="aqua" size="sm">Details </MDBBtn></Link></td>
                                    </tr>
                                    <tr>
                                    <td><span className="fa fa-user fa-lg"></span>Std 11</td>
                                        <td>35</td>
                                        <td><Link to="/addNew" ><MDBBtn gradient="aqua" size="sm"> Add </MDBBtn></Link></td>
                                        <td>6</td>
                                        <td><Link to="/newTest" ><MDBBtn gradient="aqua" size="sm"> Create </MDBBtn></Link></td>
                                        <td><Link to="/groupdetails" ><MDBBtn gradient="aqua" size="sm">Details </MDBBtn></Link></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Link to="/createGroup" ><MDBBtn gradient="aqua" size="md"> Create Group </MDBBtn></Link>
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
        </div>
    );
}

export default Admin;
