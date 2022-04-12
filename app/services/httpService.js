const axios = require('axios')



exports.get = async (url) => {

    const response = await axios.get(url)
    return response;

}


exports.post = async (url, data, headers = {}) => {

    const response = await axios.post(url, data, { headers })
    return response;

}