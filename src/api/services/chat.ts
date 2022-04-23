import { KILOGRAM_API_URL } from "../../config"

export const getAllChats = () => {
  return fetch(KILOGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
          chats {
            image
            name
            text
            messages {
              createdBy { 
                image
                login 
                name
              }        
            }
          }
        }`,
    }),
  })
    .then((response) => response.json())
    .then((json) => json.data)
}

export const getAllUsers = () => {
  return fetch(KILOGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetAllUsers{
        users(first:100){
            name
        }
      }`,
    }),
  })
    .then((response) => response.json())
    .then((json) => json.data)
}

export const createChat = (name: string, type: string, members: string[]) => {
  return fetch(KILOGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation CreateChat($name:String!, $type:ChatType!, $members: [String!]!){
  createChat(name:$name, type: $type, members: $members){
   id
    name
    type
    owner{
      name
    }
    members(first: 100){
      name
    }
  }
}`,
      variables: {
        name: name,
        type: type,
        members: members,
      },
    }),
  })
    .then((response) => response.json())
    .then((json) => json.data)
}
