// import axios from 'axios';
// // Get Spotify Auth
// const searchSpotify = (searchItem) => new Promise((resolve, reject) => {
//   const result = axios.get(`https://api.spotify.com/v1/search?q${searchItem}&type=track`);
//   result
//       .then(({ data }) => resolve(data))
//       .catch((err) => reject(err));
// });

// export default searchSpotify;

import axios from 'axios';
import querystring from 'query-string';

// get the below from spotify
const clientId = 'd5de89fdfacc482e98d0a77977bf5490';
const clientSecret = '160eb09c9fea492d8a2dad22f0f866f1';

const searchSpotify = (searchItem) => new Promise((resolve, reject) => {
  const authOptions = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  data: querystring.stringify({
  grant_type: 'client_credentials',
  }),
  headers: {
    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')),
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  json: true,
  };
  axios(authOptions).then((res) => {
  axios.get(`https://api.spotify.com/v1/search?q=${searchItem}&type=track`, {
  headers: { 'Authorization': 'Bearer ' + res.data.access_token },
  }).then(({ data }) => resolve(data))
  .catch((err) => reject(err));
  }).catch((err) => (err));
});

export default searchSpotify;