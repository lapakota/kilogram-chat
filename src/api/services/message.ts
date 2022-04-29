import { KILOGRAM_API_URL } from "../../config"

export const editMessage = (
  chatId: string,
  messageId: string,
  text: string,
  token: string
) => {
  return fetch(KILOGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      query: `mutation EditMessage($chatId:ID!, $messageId:ID!, $text: String!){
  editMessage(chatId: $chatId, messageId: $messageId, text: $text){
    id
    text
    createdAt
    createdBy{
      name
    }
  }
}`,
      variables: {
        chatId: chatId,
        messageId: messageId,
        text: text,
      },
    }),
  })
    .then((response) => response.json())
    .then((json) => json.data)
}

export const deleteMessage = (chatId: string, messageId: string) => {
  return fetch(KILOGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation DeleteMessage($chatId:ID!, $messageId:ID!){
  deleteMessage(chatId: $chatId, messageId: $messageId)
}`,
      variables: {
        chatId: chatId,
        messageId: messageId,
      },
    }),
  })
    .then((response) => response.json())
    .then((json) => json.data)
}
