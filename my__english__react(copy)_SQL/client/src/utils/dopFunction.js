import { LEARN_WORDS } from "./consts"

const userId = localStorage.getItem("userId")

export const handleChange = (id) => {
    const arrCheck = JSON.parse(localStorage.getItem(`arrCheck-${userId}`)) || []
    if (arrCheck.includes(id)) {
        const index = arrCheck.indexOf(id)
        arrCheck.splice(index, 1)
        localStorage.setItem(`arrCheck-${userId}`, JSON.stringify(arrCheck))
    } else {
        arrCheck.push(id)
        localStorage.setItem(`arrCheck-${userId}`, JSON.stringify(arrCheck))
    }
}


export const isCheckTrue = (id) => {
    const arrCheck = JSON.parse(localStorage.getItem(`arrCheck-${userId}`)) || []
    if (arrCheck.includes(id)) {
        return true
    } else return false
}


export const switching = () => {
    if (localStorage.getItem('switch') === 'true') {
        localStorage.setItem('switch', false)
        document.location.href = LEARN_WORDS
    } else {
        localStorage.setItem('switch', true)
        document.location.href = LEARN_WORDS
    }
}

























