import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import styles from "./App.module.css";
import {Login} from "../Login/login";
import {Register} from "../Register";
import {Provider} from "react-redux";
import {store} from "../../store/store";
import ChatPage from "../Chat";

export function App() {
    const [data, setData] = useState({ chats: [] });

    useEffect(() => {
        const controller = new AbortController();

        fetch("https://kilogram-api.yandex-urfu-2021.ru/query", {
            signal: controller.signal,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `{
          chats {
            image
            name
            messages {
              createdBy { 
                image
                login 
                name
              }
        
              text
            }
          }
        }`,
            }),
        })
            .then((response) => response.json())
            .then((json) => setData(json.data));

        return () => controller.abort();
    }, []);

    return (
        <Provider store={store}>
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Routes>
            </BrowserRouter>
        </div>
        </Provider>);
}
