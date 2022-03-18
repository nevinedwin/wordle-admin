import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import data from '../../data'
import './main-page.css'


function MainPage() {
    const [currentWordStatus, setCurrentWordStatus] = useState(false)
    const [playerDetailsStatus, setPlayerDetailsStatus] = useState(false)
    const [playerDetails, setPlayerDetails] = useState(false)
    const [count, setCount] = useState(1)
    const [wordleData, setWordleData] = useState({
        word: '',
        day: ''
    })
    const navigate = useNavigate()

    const inputHandler = (event) => {
        const { name, value } = event.target
        setWordleData({ ...wordleData, [name]: value })
    }

    const hiddenHandler = () => {
        setCurrentWordStatus(true)
        setPlayerDetailsStatus(false)
        setPlayerDetails(false)
    }

    const formHandler = (event) => {
        event.preventDefault()
        if (wordleData.word === '' || wordleData.day === '') {
            toast.warn('Please enter the hidden word')
        }
        else {
            setCurrentWordStatus(false)
            console.log(wordleData)
        }
    }
    const statusHandler = () => {
        setCurrentWordStatus(false)
        setPlayerDetailsStatus(true)
    }

    const detailsHandler = (event) => {
        setPlayerDetails(true)
        console.log(event.target.value)
    }

    const closeHandler = () =>{
        setPlayerDetailsStatus(false)
        setPlayerDetails(false)
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
                            <form onSubmit={formHandler}>
                                <Form.Label className='main-page-form-label'>Enter Hidden Word</Form.Label>
                                <Form.Control className='main-page-form-input' type='text' name='word' value={wordleData.word} placeholder='Enter the hidden word' onChange={inputHandler}></Form.Control>
                                <Form.Label className='main-page-form-label'>Enter the day</Form.Label>
                                <Form.Control className='main-page-form-input' type='text' name='day' value={wordleData.day} placeholder='Enter the day' onChange={inputHandler}></Form.Control>
                                <Button className='done-button' type='submit' size='lg' variant='success'>Done</Button>
                                <Button className='close-button' type='submit' size='lg' variant='success' onClick={() => setCurrentWordStatus(false)}>Close</Button>
                            </form>
                        </Col>
                    </Row>
                </Container> : null
            }
            {
                playerDetailsStatus ? <div className='button-div'>
                    <Button className='close-button' type='submit' size='lg' variant='success' value='1' onClick={detailsHandler}>Day 1</Button>
                    <Button className='close-button' type='submit' size='lg' variant='success' value='2'  onClick={detailsHandler}>Day 2</Button>
                    <Button className='close-button' type='submit' size='lg' variant='success' value='3'  onClick={detailsHandler}>Day 3</Button>
                    <Button className='close-button' type='submit' size='lg' variant='success' value='4'  onClick={detailsHandler}>Day 4</Button>
                    <Button className='close-button' type='submit' size='lg' variant='success' value='5'  onClick={detailsHandler}>Day 5</Button>
                    <Button className='close-button' type='submit' size='lg' variant='success' onClick={closeHandler}>Close</Button>
                </div> : null
            }
            {
                playerDetails ? <div>
                    <Table className='main-page-table' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Game Status</th>
                                <th>Attempt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(data).map(function (key) {
                                    return <tr>
                                        <td key={data[key].email}>{data[key].email}</td>
                                        <td key={data[key].email}>{data[key].day}</td>
                                        <td key={data[key].email}>{data[key].time}</td>
                                        <td key={data[key].email}>{data[key].gameStatus}</td>
                                        <td key={data[key].email}>{data[key].attempt}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
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