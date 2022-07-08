import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null;

const setToken = tok => {
  token = `bearer ${tok}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const create = async (data) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, data, config);
  return response.data;
}

const modify = async (id, data) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${id}`, data, config);
  return response.data;
}

const remove = async (id) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
}

export default { getAll, create, modify, remove, setToken }