import React, { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Context } from ".."
import { authRouters, pablicRouters } from "../routes"
import { LOGIN_ROUTE } from "../utils/consts"


const AppRouter = () => {
    const { user } = useContext(Context)
    
    return (
        <Routes>
            {user.isAuth && authRouters.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} />
            )}
            {pablicRouters.map(({ path, Element }) => 
            <Route key={path} path={path} element={<Element />} />
            )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}



export default AppRouter