import axios from 'axios'
const baseUrl = '/api/reviews'

let token = null
let config

//BACKEND REQUESTS
const setToken = newToken => {
    token = `bearer ${newToken}`

    config = {
        headers: { Authorization: token }
    }
}

const getAll = () => {
    const request = axios.get(baseUrl)
    //console.log(request)
    return request.then(response => response.data)
}

const getBookReviews = async newObject => {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async newObject => {
    const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return request.data
  }

// const getReviews = async queryObject => {
//     const request = await axios.get(``)
// }

//OPEN LIBRARY REQUESTS
const getOLBook = async queryObject => {
    const request = await axios.get(`https://openlibrary.org/works/${queryObject}.json`, queryObject)
    return request.data
}

const query = async queryObject => {
    const request = await axios.get(`http://openlibrary.org/search.json?q=${queryObject}`, queryObject)
    console.log(request.data)
    return request.data
}

const findAuthorWorks = async queryObject => {
    const request = await axios.get(`http://openlibrary.org/authors/${queryObject}/works.json`, queryObject)
    console.log(request)
    return request.data
}

export default { getAll, create, update, setToken, getOLBook, query, findAuthorWorks, getBookReviews }