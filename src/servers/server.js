const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
require('dotenv').config()
const token = process.env.TELEGRAN_TOKEN
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

module.exports = {bot}