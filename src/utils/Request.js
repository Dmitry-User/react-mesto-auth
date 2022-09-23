const BASE_URL = "https://auth.nomoreparties.co";

export const request = ({ url, method, token, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  })
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
