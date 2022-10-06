import { LOGIN_ROUTE, REGISTRATION_ROUTE, LEARN_WORDS } from "./utils/consts"
import Auth from "./pages/Auth"
import LearnWords from "./pages/LearnWords"




export const authRouters = [
    {
        path: LEARN_WORDS,
        Element: LearnWords
    }
]

export const pablicRouters = [
    {
        path: LOGIN_ROUTE,
        Element: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Auth
    }
]








