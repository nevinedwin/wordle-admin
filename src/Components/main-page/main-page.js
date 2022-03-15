import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import data from '../../data'
import './main-page.css'

let details = []
function MainPage() {
    const [currentWordStatus, setCurrentWordStatus] = useState(false)
    const [playerDetailsStatus, setPlayerDetailsStatus] = useState()
    const [hiddenWord, setHiddenWord] = useState('')
    const navigate = useNavigate()
    const hiddenHandler = () => {
        setCurrentWordStatus(true)
    }
    const doneHanlder = (event) => {
        event.preventDefault()
        if (hiddenWord === '') {
            toast.warn('Please enter the hidden word')
        }
        else {
            setCurrentWordStatus(false)
            setHiddenWord(event.target.value)
            console.log(hiddenWord)
        }
    }
    const statusHandler = () => {
        setPlayerDetailsStatus(true)
    }

    console.log(data[18].users[0].email)
    for (var i = 0; i < 2; i++) {

        details.push(data[18].users[i].email)
        console.log(details)

    }

    return (
        <div>
            <Container className='main-page-first-container' fluid>
                <Row className='main-page-first-row'>
                    <Col className='main-page-first-col' lg={6}>
                        <Button className='main-page-button' variant='success' onClick={hiddenHandler}>Hidden Word</Button>
                    </Col>
                    <Col className='main-page-second-col' lg={5}>
                        <Button className='main-page-button' variant='success' onClick={statusHandler}>Status</Button>
                    </Col>
                    <Col className='main-page-second-col'>
                        <Button className='main-page-button' variant='success' onClick={() => navigate('/')}>Signout</Button>
                    </Col>
                </Row>
            </Container>
            {
                currentWordStatus ? <Container className='main-page-second-container' >
                    <Row className='main-page-second-row' >
                        <Col className='main-page-second-first-col' >
                            <form>
                                <Form.Label className='main-page-form-label'>Enter Hidden Word</Form.Label>
                                <Form.Control className='main-page-form-input' type='text' value={hiddenWord} placeholder='Enter the hidden word' onChange={(event) => setHiddenWord(event.target.value)}></Form.Control>
                                <Button className='done-button' type='submit' size='lg' variant='success' onClick={doneHanlder}>Done</Button>
                                <Button className='close-button' type='submit' size='lg' variant='success' onClick={() => setCurrentWordStatus(false)}>Close</Button>
                            </form>
                        </Col>
                    </Row>
                </Container> : null
            }
            {
                playerDetailsStatus ? <div>
                    <Table className='main-page-table' striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                    </Table>
                    <Button className='close-button' type='submit' size='lg' variant='success' onClick={() => setPlayerDetailsStatus(false)}>Close</Button>
                </div> : null
            }

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />


        </div>
    )
}

export default MainPage