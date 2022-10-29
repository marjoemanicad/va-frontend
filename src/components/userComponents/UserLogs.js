
import { useState, useEffect } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function UserLogs() {

    const [logs, setLogs] = useState([''])
    const token = localStorage.getItem('mytoken')

    useEffect(() => {
        fetch('https://va-restapi.herokuapp.com/api/rest-auth/user/', {
              method:'GET',
                  headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                  } 
            })
        .then(resp => resp.json())
        .then(result => 
            {
                const userid = result.id
                fetch(`https://va-restapi.herokuapp.com/api/logs/?user=${userid}`, {
                method:'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`                        } 
                })
                .then(resp => resp.json())
                .then(result => setLogs(result))
                .catch(error => console.log(error))
            })
        .catch(error => console.log(error))
    }, [token])
    
  return (
    <div className="scroll">
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Date</th>
                <th scope='col'>Logged In</th>
                <th scope='col'>Logged Out</th>
                <th scope='col'>Work Hours</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody tag="section" >
            {logs.map((log,key) => 
            
                <tr key={key}>
                    
                    <td>
                    <div className='d-flex align-items-center'>
                    <img
                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                    />
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{log.user}</p>
                        <p className='text-muted mb-0'>{log.email}</p>
                    </div>
                    </div>
                </td>
                <td>
                    <h5>{log.date_created}</h5>
                </td>
                 <td>
                 <p className='fw-normal mb-1'>{log.time_in}</p>
                </td>
                <td>
                <p className='fw-normal mb-1'>{log.time_out}</p>
                </td>
                
                <td>
                    <p>{log.work_hours}</p>
                    <p>{log.earned_credit}</p>
                </td>

                
               
                
                </tr>
                
            )}
                
            </MDBTableBody>
        </MDBTable>
      
        
    </div>
  )
}

export default UserLogs