import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import Cookies from 'js-cookie'


interface PropPrivateRoute {
  children: ReactNode
}

export function OnLoggedPrivateRoute({children}: PropPrivateRoute) {
  let isLogged = true
  const cookie = Cookies.get("sessionId")
  if (cookie) {
    isLogged = false
  }
  return (
    isLogged ? children : <Navigate to="/home"/>
  )
}