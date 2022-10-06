import axios from "axios"


const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})




const authIntercaptor = config => {
    config.headers.authorization = `${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authIntercaptor)


export {
    $host,
    $authHost
}












