let ans

module.exports =  function (textquery){
// Imports the Google Cloud client library
const {Assistant, AssistantLanguage} = require('nodejs-assistant');

// Your credentials
// const credentials = require('path-to-your-credentials.json');
const credentials = require('./devicecredentials.json');

// Creates a client
const assistant = new Assistant(/* required credentials */ {
  type: 'authorized_user',
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  refresh_token: credentials.refresh_token,
}, /* additional, optional options */ {
  locale: AssistantLanguage.ENGLISH, // Defaults to AssistantLanguage.ENGLISH (en-US)
  deviceId: 'your device id',
  deviceModelId: 'your device model id',
});

// Sends a text query to the assistant
// assistant.query('Hi!')

assistant.query(textquery)
  .then(response => {
    // response contains all the fields returned by the assistant, such as the text and audio
    // console.log(`Response: ${response.text}`);
    ans+=response.text;
    // response.audio is a Buffer containing the audio response by the assistant
  })
  .catch(err => {
    console.error('ERROR: ', err);
  });
  ans+='\n'
  return ans
}