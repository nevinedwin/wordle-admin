import React from 'react'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import './main-page.css'
import { allPlayerDetails, getWord, playerDetailsByDay, setWord } from '../../services/apiServices';
import { decodeWord } from '../../utils/utils';


function MainPage() {
    const [currentWordStatus, setCurrentWordStatus] = useState(true)
    const [playerDetailsStatus, setPlayerDetailsStatus] = useState(false)
    const [playerDetails, setPlayerDetails] = useState(false)
    const [dateArray, setDateArray] = useState([])
    const [todayWord, setTodayWord] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [wordleData, setWordleData] = useState({
        word: ''
    })
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        allPlayerDetails().then(res => {
            const details = res.data.messages
            let detailsArray = []
            details.forEach(item => {

                if (!detailsArray.includes(item.date)) {
                    detailsArray.push(item.date)
                }
            })
            setDateArray(detailsArray)
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
                setWord(wordleData)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success('Hidden Word Updated Successfully')
                            setWordleData({
                                word: ''
                            })
                        }
                        else {
                            toast.warn('Error')
                        }
                    })


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
        getWord(date).then(res => {
            const decodedWord = decodeWord(res.data.result).toUpperCase()
            setTodayWord(decodedWord)
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
                                <Button key={today} className='close-button' type='submit' size='lg' variant='success' onClick={() => detailsHandler(today)}>Day {index + 1} - {today.slice(2, 4)}</Button>
                            )

                        })
                    }
                    <Button className='close-button' type='submit' size='lg' variant='success' onClick={closeHandler}>Close</Button>

                </div> : null
            }
            {
                playerDetails ? <div>
                    <div className='word-head'>
                        <h2 className='hidden-word'>Word : {todayWord}</h2>
                        <input type='text' placeholder='search' value={search} onChange={(event) => setSearch(event.target.value)}></input>
                    </div>
                    <Table className='main-page-table' striped bordered hover>
                        <thead>
                            <tr>
                                <th>SL No</th>
                                <th>Email</th>
                                <th>Attempt</th>
                                <th>Time</th>
                                <th>Game Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userDetails.length > 0 && userDetails.map((item, index) => {
                                    if (search === item.gameStatus) {
                                        return (
                                            <tr className={item.gameStatus === 'Win' ? 'green' : ''} key={item.email}>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.attempt}</td>
                                                <td>{item.time}</td>
                                                <td>{item.gameStatus}</td>
                                            </tr>
                                        )
                                    }
                                    else if(item.email === search.toLowerCase()){
                                        return (
                                            <tr className={item.gameStatus === 'Win' ? 'green' : ''} key={item.email}>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.attempt}</td>
                                                <td>{item.time}</td>
                                                <td>{item.gameStatus}</td>
                                            </tr>
                                        )
                                    }
                                    if(search === '' || !search === item.gameStatus || !item.email === search.toLowerCase()){
                                        return (
                                            <tr className={item.gameStatus === 'Win' ? 'green' : ''} key={item.email}>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.attempt}</td>
                                                <td>{item.time}</td>
                                                <td>{item.gameStatus}</td>
                                            </tr>
                                        )
                                    }
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