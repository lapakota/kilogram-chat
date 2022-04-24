import { KILOGRAM_API_URL } from "../config"

export function auth(login: string, password: string) {
  return fetch(KILOGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query signIn($login: String!, $password: String!)
          {
              signIn(login: $login, password: $password)
          }`,
      variables: { login: login, password: password },
    }),
  })
    .then((response) => response.json())
    .then((x) => x.data)
}
