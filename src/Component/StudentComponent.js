import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table } from 'reactstrap';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const Student = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="container mt-5">
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                        Old
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                        New
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
                                        <th>Percentage</th>
                                        <th>Score</th>
                                        <th>Duration</th>
                                        <th>Rank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span className="fa fa-file fa-lg"></span>TestA</td>
                                        <td>88%</td>
                                        <td>88/100</td>
                                        <td>00:28:05</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td><span className="fa fa-file fa-lg"></span>TestB</td>
                                        <td>82%</td>
                                        <td>82/100</td>
                                        <td>00:40:05</td>
                                        <td>3</td>
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
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Student;
