import styles from "./Chat.module.scss"
import React, {useEffect, useState} from "react"

export const Chat: React.FC = () => {
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
        <div className={styles.root}>
            {data.chats.map((chat) => (
                <div className={styles.chat}>
                    <header>
                        <img alt="chat logo" src={`data:image/png;base64,${chat.image}`} />
                        {chat.name}
                    </header>
                    <main>
                        <ul>
                            {chat.messages.map((message) => (
                                <li className={styles.message}>
                                    {message.createdBy.image ? (
                                        <img
                                            alt="user avatar"
                                            src={`data:image/png;base64,${message.createdBy.image}`}
                                        />
                                    ) : null}
                                    {message.createdBy.login}: {message.text}
                                </li>
                            ))}
                        </ul>
                    </main>
                </div>
            ))}
        </div>
    );
}
