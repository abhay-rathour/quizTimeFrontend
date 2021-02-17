import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Button } from 'reactstrap';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const GroupDetail = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="container mt-5">
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                        Pending Request
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                        Group Member
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}>
                        Old Test
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}>
                        New Test
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { toggle('5'); }}>
                        Group Details
                        </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="5">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Unique Id</th>
                                        <th>Requests</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Abhay</td>
                                        <td>abhay192</td>
                                        <td><Button type="submit" color="outline-primary" size="sm">
                                            Confirm
                                    </Button>
                                            <Button type="submit" color="outline-danger" size="sm">
                                                Delete
                                    </Button></td>
                                    </tr>
                                    <tr>
                                        <td>Utkarsh</td>
                                        <td>utka707</td>
                                        <td>    <Button type="submit" color="outline-primary" size="sm">
                                        Confirm
                                    </Button>
                                            <Button type="submit" color="outline-danger" size="sm">
                                            Delete
                                    </Button></td>
                                    </tr>
                                    <tr>
                                        <td>Saurav</td>
                                        <td>saurav2005</td>
                                        <td><Button type="submit" color="outline-primary" size="sm">
                                        Confirm
                                    </Button>
                                            <Button type="submit" color="outline-danger" size="sm">
                                            Delete
                                    </Button></td>
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
                                        <th>S.N.</th>
                                        <th>Name</th>
                                        <th>Unique Id</th>
                                        <th>Remove</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Abhay</td>
                                        <td>1901CS77</td>
                                        <td><Link to="#" ><MDBBtn gradient="aqua" size="sm"> Remove Member </MDBBtn></Link></td>
                                        <td><Link to="#" ><MDBBtn gradient="aqua" size="sm"> Details </MDBBtn></Link></td>

                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Utkarsh</td>
                                        <td>1932IT32</td>
                                        <td><Link to="#" ><MDBBtn gradient="aqua" size="sm"> Remove Member </MDBBtn></Link></td>
                                        <td><Link to="#" ><MDBBtn gradient="aqua" size="sm"> Details</MDBBtn></Link></td>

                                    </tr>
                                </tbody>
                            </Table>

                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
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
                <TabPane tabId="4">
                    <Row>
                        <Col sm="12">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Test Name</th>
                                        <th>Tentative Start Time</th>
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
                                            <Link to="#" ><MDBBtn gradient="aqua" size="sm">Start</MDBBtn></Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="fa fa-file fa-lg"></span>TestB</td>
                                        <td>Jan 28,2021 9:00AM IST</td>
                                        <td>Science</td>
                                        <td>00:60:00</td>
                                        <td>50
                                            <Link to="#" ><MDBBtn gradient="aqua" size="sm">Start</MDBBtn></Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                        </Col>
                    </Row>
                    <Link to="/createtest" ><MDBBtn gradient="aqua" size="sm"> Create a New </MDBBtn></Link>
                </TabPane>
                <TabPane tabId="5">
                    <Row>
                        <Col sm="12">
                            <Table striped bordered hover>

                            </Table>

                        </Col>
                    </Row>

                </TabPane>
            </TabContent>
        </div>

    );
}

export default GroupDetail;
