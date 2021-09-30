const url = 'https://api.intra.42.fr/oauth/token';
const question = '?';
const queryData = {
  grant_type: 'client_credentials',
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  redirect_uri: 'http://localhost:3000/mypage',
  scope: 'public',
};

const config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Mobile': 'false',
    'response-Type': 'text',
  },
};

const asembleQuery = () => {
  const queryArray = [];
  Object.keys(queryData).forEach(key => {
    queryArray.push(`${key}=${queryData[key]}`);
  });
  return queryArray.join('&');
};

const getToken = async () => {
  try {
    const fetchToken = await fetch(url + question + asembleQuery(), config);
    const response = await fetchToken.json();
    return response;
  } catch (e) {
    console.log(e);
    alert('getToken failed');
    return e;
  }
};

export default getToken;
