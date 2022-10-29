import React from 'react'
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from "react";
function UserCredits() {
  const [leave, setLeave] = useState([''])
  const token = localStorage.getItem('mytoken')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/rest-auth/user/', {
      method:'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          } 
    })
    .then(resp => resp.json())
    .then(result => 
      {
        fetch(`http://127.0.0.1:8000/api/client/${result.id}`, {
          method:'GET',
              headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
              } 
        })
        .then(resp => resp.json())
        .then(result => {console.log(result)
          setLeave(result)})
      })
    .catch(error => console.log(error))
  }, [token])
  return (
    <div>
      <Row>
        <Row><h1>Earned Leave</h1></Row>
        <Row><h3>{leave.earned_leave}</h3></Row>
        <Row><h1>Used Leave</h1></Row>
        <Row><h3>{leave.used_leave}</h3></Row>
        <Row><h1>Remaining Leave</h1></Row>
        <Row><h3>{leave.remaining_credits}</h3></Row>
      </Row>
      <Row>
      <table class="table">
          <thead class="table-dark">
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Hour</th>
          </tr>
          </thead> 
      {leave.leave?.map((test,key) => 
          <tbody key={key}>
          <tr>
            <th scope='col'>{test.date}</th>
            <th scope='col'>{test.used_hour}</th>
          </tr>
          </tbody>
      )}
       </table>
      </Row>
      
      
    </div>
  )
}

export default UserCredits