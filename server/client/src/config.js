import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'https://memo-ries-project.herokuapp.com/'
})