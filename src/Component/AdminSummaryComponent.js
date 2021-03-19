import React, { Component } from 'react';
import {  Table} from 'reactstrap';
import { MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';

class AdminSummary extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isFetching:'false',
            group:null,
        };

    }
    componentDidMount(){
        const bearer= 'Bearer '+localStorage.getItem('token');
        const testid=this.props.match.params.testId;
        this.setState({...this.state, isFetching: true});
        fetch(baseUrl+'admin/results/'+testid, {
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
    }

    render(){
        if(this.state.isFetching)
        {
            return (
                <p>Loading Group Result Summary:-----</p>
            );
        }
        else{
            console.log(this.state.group)
            const group=this.state.group;
            
            var testslist;
            if(group.length)
            {
                testslist=group.map((user,index)=>{
                    
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.uniqueID}</td>
                            <td>{user.marks}</td>
                            <td>{user.totalMarks}</td>
                            <td>
                                <Link to={`/adminresult/${this.props.match.params.testId}/${user.userID}`} ><MDBBtn gradient="aqua" size="sm">See Responses</MDBBtn></Link>
                            </td>
                        </tr>

                    );

                })
            }
            else
            {
                testslist='No Members submitted Yet'
            }
            return (
                    <div className="container mt-5">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>S. No.</th>
                                    <th>Name</th>
                                    <th>Unique Id</th>
                                    <th>Marks</th>
                                    <th>Total Marks</th>
                                    <th>Responses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testslist}
                            </tbody>
                        </Table>
                    </div>
            );
        }
    }   
}

export default AdminSummary;
