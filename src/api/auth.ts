export function auth(login: string, password: string) {
  const controller = new AbortController()

  fetch("https://kilogram-api.yandex-urfu-2021.ru/query", {
    signal: controller.signal,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `signIn($login: String!, $password:String!) {
          {
              signIn(login: $login, password: $password)
          }
        `,
      variables: { login: login, password: password },
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
}
