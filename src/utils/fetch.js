export const host = "http://localhost:5000";
// export const host = ''

export const Fetch = async (route, { method, body, token }) => {
  var res = await fetch(host + route, {
    method: method || 'GET',
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(body),
  });
  res = await res.json()
  return res
};
