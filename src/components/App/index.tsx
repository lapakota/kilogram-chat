import { BrowserRouter, Routes, Route } from "react-router-dom"

import styles from "./index.module.css"
import { Login } from "../Login"
import { Register } from "../Register"
import { Provider } from "react-redux"
import { store } from "../../store/store"
import ChatPage from "../ChatPage";

export function App() {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}
