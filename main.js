const {getJob} = require('./src/middlewares/linkedin/jobs');
const {mandaNude} = require('./src/middlewares/nude/sendNude');
const {bot}  = require('./src/servers/server');
const {getWhois}  = require('./src/middlewares/whois/whois');
const axios = require('axios');
const { sendMessage, getSessionId } = require('./src/servers/assistent');
const { getCache, setCache } = require('./src/servers/redis');

let session_id  = false; 

const quotes = [
"Leia ao menos 5 páginas de qualquer coisa por dia.",
"Elogie alguém",
"Pare ao menos 5 minutos para tentar não pensar em nada",
"Coverse com alguém sobre qualquer assunto que vocé ainda não domine e a pessoa sim",
"Procure evitar estar sempre em lugares onde você será a atenção",
"Observe mais",
"Deixe seu ego de lado e aceite a opinião dos outros",
"Pare de cobrar dos outros ser ouvido",
"Lembre-se de quem se lembra de vc",
"Fale um pouco mais baixo",
"Deixe algumas coisas se perderem mesmo, procure entender a real necessidade do que mais consome seu tempo",
"Compartilhe algo de bom",
"Nunca peça algo em troca de algum favor",
"Não espere muito ou nada de ninguem",
"Não espere nada de ninguem",
"Não espere ninguem",
"Nunca deixe de ter um sonho",
"Escreva||leia ao menos uma página de qualquer coisa por dia",
"Respeite seu sono",
"Deixe ir",
"Não espere nada de ninguem",
"O apego pelo passado gera a depressão. O apego pelo furturo gera a anciedade. O viver do agora constroi a felicidade",
"Nunca deixe de sonhar"
]


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
}else if(msg.text.toLowerCase() == 'me ajude' || msg.text.toLowerCase() == "ajuda" || msg.text.toLowerCase() == "bom dia"){
    var item = quotes[Math.floor(Math.random() * quotes.length)]
    bot.sendMessage(chatId,item )

}else if(msg.text.toLowerCase() == "config"){
  
  try{  
    
    let id = await getSessionId();
    console.log(id);
    setCache(chatId,id.result.session_id);
    session_id = true

  }catch(err){
    console.log(err)
  }

}else if(msg.text && session_id){

   try{
     let id  = await getCache(chatId);
     if(id){
      let response  = await sendMessage(msg.text,id);
      bot.sendMessage(chatId,response);
     }
   }catch(err){
     console.log(err)
   }
}});

