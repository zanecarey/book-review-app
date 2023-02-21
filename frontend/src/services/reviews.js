import axios from 'axios'
const baseUrl = '/api/reviews'
const userUrl = '/api/users'
const commentUrl = '/api/comments'

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

const getReview = (newObject) => {
    const request = axios.get(`${baseUrl}/${newObject}`)
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

const updateComment = async newObject => {
    const request = await axios.put(`${commentUrl}/${newObject.id}`, newObject, config)
    return request.data
}

const getUserReviews = async newObject => {
    const response = await axios.get(`${userUrl}/${newObject}`)
    return response.data
}

const createComment = async newObject => {
    const response = await axios.post(commentUrl, newObject, config)
    return response.data
}

const getComments = async newObject => {
    const response = await axios.post(commentUrl, newObject, config)
    return response.data
}

//OPEN LIBRARY REQUESTS
const getOLBook = async queryObject => {
    const request = await axios.get(`https://openlibrary.org/works/${queryObject}.json`, queryObject)
    return request.data
}

const query = async queryObject => {
    const request = await axios.get(`http://openlibrary.org/search.json?q=${queryObject}`, queryObject)
    return request.data
}

const findAuthorWorks = async queryObject => {
    const request = await axios.get(`http://openlibrary.org/authors/${queryObject}/works.json`, queryObject)
    return request.data
}

const findAuthorName = async queryObject => {
    const request = await axios.get(`http://openlibrary.org/authors/${queryObject}.json`, queryObject)
    return request.data
}

export default { getAll, create, update, updateComment, setToken, getOLBook, query, findAuthorWorks,findAuthorName, getBookReviews, getReview, getUserReviews, createComment, getComments }