import React, { useState } from 'react';
import '../styles/login.css';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login_container d-flex justify-content-between'>
              <div className='login_img'>
                <img src={loginImg} alt="" />
              </div>

              <div className='login_form'>
                <div className='user'>
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                  </FormGroup>
                  <Button className='btn secondary_btn auth_btn' type='submit'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login