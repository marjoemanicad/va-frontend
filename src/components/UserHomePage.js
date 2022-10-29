import React from 'react'
import UserLogs from './userComponents/UserLogs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserDashboard from './userComponents/UserDashboard';
import UserCredits from './userComponents/UserCredits';

function UserHomePage() {
  return (
    <div>
      <Container fluid >
        <Row>
          <Col sm={9}>
            <Row style={{ height: '20vh' }}>
              <UserDashboard/>
            </Row>
            <Row style={{ height: '70vh' }}>
              <UserLogs/>
            </Row>
          </Col>
          
          <Col sm={3}>
            <Row style={{ height: '90vh' }}><UserCredits/></Row>
            
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default UserHomePage