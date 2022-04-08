import axios from 'axios'

export const setWord = async (body) => {
    return axios.post('http://13.233.253.252:3000/admin/setWord', body)
}

export const playerDetailsByDay = async (day) => {
    return axios.get(`http://13.233.253.252:3000/admin/userDetails?date=${day}`)
}

export const allPlayerDetails = async () => {
    return axios.get(`http://13.233.253.252:3000/admin/userDetails`)
}

export const getWord = async (day) => {
    return axios.get(`http://13.233.253.252:3000/users/getWord?date=${day}`)
}


