import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async userObject => {
    const response = await axios.post(baseUrl, userObject)
    return response.data
}

export default { createUser }