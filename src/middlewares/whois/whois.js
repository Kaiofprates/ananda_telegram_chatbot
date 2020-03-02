
const axios  = require('axios');


async function getWhois(url){
    try{
        const data  =  await axios.get(`https://fetchreceita.herokuapp.com/?domain=${url}`).then(function (response) {
            return(JSON.stringify(response.data));
          })
        return data;
    }catch(err){
        return "No data"
    }
}

module.exports = {getWhois}