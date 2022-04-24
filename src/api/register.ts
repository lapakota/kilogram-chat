import { KILOGRAM_API_URL } from "../config"

export function register(login: string, password: string, userName: string) {
  return fetch(KILOGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: ` mutation register($login: String!, $password:String!, $name:String!) {
                        register(login: $login, password: $password, name: $name) 
                         {
                           image
                         }
                           }`,
      variables: { login: login, password: password, name: userName },
    }),
  })
    .then((response) => response.json())
    .then((x) => x.data)
}
