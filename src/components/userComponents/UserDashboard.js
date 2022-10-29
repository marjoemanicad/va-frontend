import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


function UserDashboard() {

  const date = new Date()
  const date1 = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const token = localStorage.getItem('mytoken')
  const [log, setLog] = useState([])
  const [kes, setKey] = useState('')
  const [ test, setTest] = useState('')
    const start = () => {
      const last_action = ('login')
        fetch('http://127.0.0.1:8000/api/logs/', {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({last_action})
        })
        .then(resp => resp.json())
        .then(result => {
          setKey(result.id)
          setLog(result)
          
          console.log(kes)
          console.log('asdasd',result)
          })
    }

    const logout = () => {
      const last_action = ('logout')
        fetch(`http://127.0.0.1:8000/api/logs/${kes}/`, {
            method:"PUT",
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({last_action})
        })
        .then(resp => resp.json())
        .then(result => {
          setKey(result.id)
          setLog(result)
          console.log('asdasd',result)
          })
        
    }
  return (
    <div>
      <div className="mb-2">
        {log.date_created === date1 && log.last_action === 'login'?
          <div>
            <Button disabled variant="success" as="input" type="button" value="Start Work" onClick={start} />{' '}   
            <Button variant="danger" as="input" type="submit"  onClick={logout} value="Stop Work" />{' '} 
          </div>
        :
        log.date_created === date1 && log.last_action === 'logout'?
          <div>
            <Button  disabled variant="success" as="input" type="button" value="Start Working" onClick={start} />{' '} 
            <Button disabled variant="danger" as="input" type="submit"  value="Stop Work" />{' '} 
          </div>
        :
          <div>
            <Button  variant="success" as="input" type="button" value="Start Working" onClick={() => {  start();setTest(`${kes}`);}} />{' '} 
            <Button variant="danger" disabled as="input" type="submit"  value="Stop Work" />{' '} 
          </div>
        }
      </div>

      <div>
      <MDBTable>
        {test}asd
        <MDBTableHead dark>
          <tr>
            <th scope='col'>User</th>
            <th scope='col'>Date</th>
            <th scope='col'>Time In</th>
            <th scope='col'>Time Out</th>
            <th scope='col'>Work Hours</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            {log.user?
             <th scope='row'>{log.user}</th>
            :
            <th scope='row'></th>
            }
           
            <td>{log.date_created}</td>
            <td>{log.time_in}</td>
            {log.time_out === log.time_in?
            <td></td>
            :
            <td>{log.time_out}</td>
            }
            <td>{log.work_hours}</td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      </div>

    
    </div>
  )
}

export default UserDashboard