const AssistantV2 = require('ibm-watson/assistant/v2'); 
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config()

let authenticator;
let assistantId = process.env.ASSISTANT_ID || '<assistant-id>';

if (process.env.ASSISTANT_IAM_APIKEY) {
  authenticator = new IamAuthenticator({
    apikey: process.env.ASSISTANT_IAM_APIKEY
  });
} 

var assistant = new AssistantV2({
  version: '2019-02-28',
  authenticator: authenticator,
  url: process.env.ASSISTANT_URL,
  disableSslVerification: true
});


function getSessionId(){
    let sessionId = assistant.createSession(
        {
          assistantId: process.env.ASSISTANT_ID || '{assistant_id}',
        },
        function(error, response) {
          if (error) {
            console.log(error);
          } else {
            return(response.result.session_id);
          }
        }
      );
    if(sessionId){
        return sessionId
    }    
}

async function sendMessage(msg,session){

  var payload = {
    assistantId: assistantId,
    sessionId: session, 
    input: {
      message_type: 'text',
      text: msg,
    },
  };

let response  = await assistant.message(payload, function(err, data) {
    if (err) {
      const status = err.code !== undefined && err.code > 0 ? err.code : 500;
      return(status)
    }
      return(data.result.output.generic[0].text)
  });

return(response.result.output.generic[0].text);

}

module.exports = {
    getSessionId,
    sendMessage
}


  