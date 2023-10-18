function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

function getAuthorization() {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    return `Bearer ${jwt}`;
  }

  return null;
}

module.exports = { checkResponse, getAuthorization };
