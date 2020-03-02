const {getJob} = require('./src/middlewares/linkedin/jobs');
const {mandaNude} = require('./src/middlewares/nude/sendNude');
const {bot}  = require('./src/servers/server');
const {getWhois}  = require('./src/middlewares/whois/whois');
const axios = require('axios');


let session_id  = false; 

// ---------------- busca por vagas --------------------
bot.onText(/\/vagas (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const jobs  = await getJob(resp)
  bot.sendMessage(chatId,jobs);
});


// --------------- busca por informações de sites--------

bot.onText(/\/whois (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  const data  = await getWhois(resp)
  bot.sendMessage(chatId,data);
});




//------------------
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);

if(msg.text == "#mandanude"){
  const url = await mandaNude()
  bot.sendPhoto(chatId, url);
}else if(msg.text  == 'Oi'){
    bot.sendMessage(chatId, 'Oiiii sumido, tudo bem?');
}else if(msg.text  == 'Tudo e vc?'){
    bot.sendMessage(chatId, 'Melhor agora ;)');
}else if(msg.text == "config"){

  axios.get('http://localhost:3000/api/session').then(function (response) {
    // handle success
    console.log(response.data);
    session_id = response.data.result.session_id; 
    if(session_id){
      bot.sendMessage(chatId,"Sucess!");
    }

  }).catch(function (error) {
    // handle error
    console.log(error);
  });

}else if(msg.text && session_id){

axios.post('http://localhost:3000/api/message', { session_id, "input": {
                         "message_type": "text",
                          "text": msg.text }}).then(function (response) {
    const res = response.data.result.output.generic[0].text
    res ? bot.sendMessage(chatId,res) : console.error('no data');
  })
  .catch(function (error) {
    console.log(error);
  });


}



});



