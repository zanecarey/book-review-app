import axios from 'axios'
const baseUrl = '/api/reviews'

let token = null
let config

const setToken = newToken => {
    token = `bearer ${newToken}`

    config = {
        headers: { Authorization: token }
    }
}

const getAll = () => {
    console.log(baseUrl)
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async newObject => {
    const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return request.data
  }

export default { getAll, create, update, setToken }