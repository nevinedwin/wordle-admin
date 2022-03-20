import React from 'react'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import data from '../../data'
import './main-page.css'
import { allPlayerDetails, getWord, playerDetailsByDay, setWord } from '../../services/apiServices';


function MainPage() {
    const [currentWordStatus, setCurrentWordStatus] = useState(true)
    const [playerDetailsStatus, setPlayerDetailsStatus] = useState(false)
    const [playerDetails, setPlayerDetails] = useState(false)
    const [dateArray, setDateArray] = useState([])
    const [word, setWord] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [wordleData, setWordleData] = useState({
        word: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        allPlayerDetails().then(res => {
            const details = res.data.messages
            details.forEach(item => {

                if (!dateArray.includes(item.date)) {
                    setDateArray(prev => [...prev, item.date])
                }
            })
        })
    }, [])

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
        if (wordleData.word === '') {
            toast.warn('Please enter the hidden word')
        }
        else {
            if (wordleData.word.length === 5) {
                console.log(wordleData.word)
                setWord({ word: wordleData.word })
                // .then(res => {
                //     if (res.status == 200) {
                //         toast.success('Hidden Word Updated Successfully')
                //         setWordleData({
                //             word: ''
                //         })
                //     }
                //     else {
                //         toast.warn('Error')
                //     }
                // })

            }
            else {
                toast.error('Enter a 5 letter word')
                setWordleData({
                    word: '',
                })
            }

        }
    }


    const statusHandler = () => {
        setCurrentWordStatus(false)
        setPlayerDetailsStatus(true)
    }

    const detailsHandler = (date) => {
        setPlayerDetails(true)
        getWord(date).then(res=>{
            setWord(res.data.result.word)
        })
        playerDetailsByDay(date).then(res => {
            if (res.status === 200) {
                setUserDetails(res.data.messages)
            }
            else {
                toast.error('Error in API fetch user details')
            }
        })
    }

    const closeHandler = () => {
        setCurrentWordStatus(true)
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
                                <Button className='done-button' type='submit' size='lg' variant='success'>Done</Button>
                            </form>
                        </Col>
                    </Row>
                </Container> : null
            }
            {
                playerDetailsStatus ? <div className='button-div'>
                    {
                        dateArray.map((today, index) => {

                            return (
                                <Button key={today} className='close-button' type='submit' size='lg' variant='success' onClick={() => detailsHandler(today)}>Day {index + 1} - {today.slice(8, 11)}</Button>
                            )
                        })
                    }
                    <Button className='close-button' type='submit' size='lg' variant='success' onClick={closeHandler}>Close</Button>

                </div> : null
            }
            {
                playerDetails ? <div>
                    <h2>Word : {word}</h2>
                    <Table className='main-page-table' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Attempt</th>
                                <th>Time</th>
                                <th>Score</th>
                                <th>Game Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userDetails.length > 0 && userDetails.map(item => {
                                    return (
                                        <tr key={item.email}>
                                            <td>{item.email}</td>
                                            <td>{item.attempt}</td>
                                            <td>{item.time}</td>
                                            <td>{item.score}</td>
                                            <td>{item.gameStatus}</td>
                                        </tr>
                                    )
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