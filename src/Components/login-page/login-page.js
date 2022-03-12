import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineUser } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import Constants from '../../constants.json'
import './login-page.css'

function LoginPage() {
  const [inputUserName, setInputUserName] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const navigate = useNavigate()
  const userName = 'tech-admin'
  const password = 'admin1234'
  localStorage.setItem('isLoggedIn', false)
  const signInFormHandler = (event) =>{
    event.preventDefault()
    if(inputUserName == '' || inputPassword == ''){
      toast.warn('Please enter the details')
    }
    else if(inputUserName === userName && inputPassword === password){
      localStorage.setItem('isLoggedIn', true)
      navigate('mainpage')
    }
    else{
      toast.warn('Incorrect username or password')
    }
  }
  return (
    <div>
      <h1 className='main-heading'>Tech Day V.17</h1>
      <Container fluid>
        <Row className='login-row'>
          <Col className='main-right-side'>
            <h1 className='main-right-heading'>Admin Login</h1>
            <form onSubmit={signInFormHandler}>
              <Form.Group>
                <Form.Label className='login-items'><AiOutlineUser className='icons' />{Constants[0].userName}</Form.Label>
                <Form.Control className='form-input' type='text'  value={inputUserName} placeholder={Constants[0].placeholderU} onChange={(event) =>setInputUserName(event.target.value)}></Form.Control>
                <Form.Label className='login-items'><BsKey className='icons' />{Constants[0].password}</Form.Label>
                <Form.Control className='form-input' type='password'  value={inputPassword}  placeholder={Constants[0].placeholderP} onChange={(event) =>setInputPassword(event.target.value)}></Form.Control>
                <Button className='login-button' type='submit' size='lg' variant='success' style={{'marginTop': '20px'}}>Login</Button>
              </Form.Group>
            </form>
          </Col>
        </Row>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </Container>
    </div>
  )
}

export default LoginPage