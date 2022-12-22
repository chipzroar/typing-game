const axios = require('axios');

const apiUrl = 'https://random-word-api.herokuapp.com/word';

const options = {
  method: 'GET',
  url: `${apiUrl}`,
  params: { number: '10' },
};

const words = () => {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

console.log(words());