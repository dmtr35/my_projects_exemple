import React, { useContext, useEffect, useState } from 'react'
import "./styles/module.css"
import TypeBar from './components/TypeBar';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom'
import { check } from './http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { Spinner } from 'react-bootstrap';


const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }
  

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
})

export default App;
