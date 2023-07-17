import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { Cadastro } from "../pages/cadastro";
import { OffLoggedPrivateRoute } from "./OffLoggedPrivateRoute";
import { Home } from "../pages/Home";
import { NewCase } from "../pages/NewCase";
import { OnLoggedPrivateRoute } from "./OnLoggedPrivateRoute";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <OnLoggedPrivateRoute>
            <LoginPage />
          </OnLoggedPrivateRoute>
        }/>
        <Route path="/cadastro" element={
          <OnLoggedPrivateRoute>
            <Cadastro />
          </OnLoggedPrivateRoute>
        }/>
        <Route path="/home" element={
            <OffLoggedPrivateRoute>
              <Home />
            </OffLoggedPrivateRoute>
          }
        />
        <Route path="/home/newcase" element={
            <OffLoggedPrivateRoute>
              <NewCase />
            </OffLoggedPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}