import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null;

const setToken = tok => {
  token = `bearer ${tok}`;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (data) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, data, config);
  return response.data;
}

export default { getAll, create, setToken }