import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useState,useEffect } from 'react';
function Users() {

  const [users, setUsers] = useState([''])
  const token = localStorage.getItem('mytoken')

  useEffect(() => {
    fetch('https://va-restapi.herokuapp.com/api/userlist/', {
      method:'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          } 
    })
    .then(resp => resp.json())
    .then(result => {
      setUsers(result)})
    .catch(error => console.log(error))
  },[token])

  return (
    <MDBTable small align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Title</th>
          <th scope='col'>Status</th>
          <th scope='col'>Position</th>
          <th scope='col'>Last</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {users.map((user,key) => 
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
                        <p className='fw-bold mb-1'>{user.username}</p>
                        <p className='text-muted mb-0'>john.doe@gmail.com</p>
                    </div>
                    </div>
                </td>
                <td>
                    {user.groups?.map(group=>
                    <p>
                      {group.name}
                      {user.username}
                    </p>
                    )}
                </td>
                <td>
                    <MDBBadge color='success' pill>
                    Active
                    </MDBBadge>
                </td>
                <td>
                    {
                        user.last_action === 'login' ?
                        <MDBBadge color='success' pill>
                        Logged In
                        </MDBBadge>
                        :
                        user.last_action === 'logout' ?
                        <MDBBadge color='danger' pill>
                        Logged Out
                        </MDBBadge>
                        :
                        null
                    }
                </td>
                <td>
                    {user.work_hours}
                </td>
                </tr>
                
            )}
      </MDBTableBody>
    </MDBTable>
  )
}

export default Users