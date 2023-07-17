import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import Cookies from 'js-cookie'


interface PropPrivateRoute {
  children: ReactNode
}

export function OffLoggedPrivateRoute({children}: PropPrivateRoute) {
  let isLogged = false
  const cookie = Cookies.get("sessionId")
  if (cookie) {
    isLogged = true
  }
  return (
    isLogged ? children : <Navigate to="/"/>
  )
}