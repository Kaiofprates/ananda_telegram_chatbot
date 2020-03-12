const {getJob} = require('./src/middlewares/linkedin/jobs');
const {mandaNude} = require('./src/middlewares/nude/sendNude');
const {bot}  = require('./src/servers/server');
const {getWhois}  = require('./src/middlewares/whois/whois');
const { sendMessage, getSessionId } = require('./src/servers/assistent');
const { getCache, setCache } = require('./src/servers/redis');


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
}else if(msg.text.toLowerCase() == "ola watson"){
  
  try{  
    
    let id = await getSessionId();
    console.log(id);
    setCache(chatId,id.result.session_id);
    session_id = true

  }catch(err){
    console.log(err)
  }

}else if(msg.text){
   
   try{
     let id  = await getCache(chatId);
     if(id){
      let response  = await sendMessage(msg.text,id);
      bot.sendMessage(chatId,response);
     }else{
      let id = await getSessionId();
      console.log(id);
      setCache(chatId,id.result.session_id);
      bot.sendMessage(chatId,'Oiii, não consegui te entender! Diga novamente!')
     }

   }catch(err){
   
   }
}});


