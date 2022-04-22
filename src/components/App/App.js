import { useEffect, useState } from "react"

import { mainStore } from "../../stores/MainStore/mainStore"
import { Provider } from "react-redux"
import styles from "./App.module.css";
import {Login} from "../Login/Login";

export function App() {
  const [data, setData] = useState({ chats: [] })

  useEffect(() => {
    const controller = new AbortController()

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
      .then((json) => setData(json.data))

    return () => controller.abort()
  }, [])

  return (
    <Provider store={mainStore}>
      <div className={styles.app}>
      <Login/>
      </div>
    </Provider>
  )
}
