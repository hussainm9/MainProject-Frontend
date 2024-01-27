import axios from 'axios'
const axiosInstance = axios.create({
    baseURL:'http://localhost:3786'
})
export default axiosInstance