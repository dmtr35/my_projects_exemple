import { $authHost, $host } from "./index";


export const registration = async (email, password) => {
    const response = await $host.post('auth/registration', { email, password })
    return (response.data.message)
}


export const login = async (email, password) => {
    const { data } = await $host.post('auth/login', { email, password })
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.id)
    return (data)
}

export const check = async () => {
    const { data } = await $authHost.get('auth/check')
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.id)
    return (data)
}


















