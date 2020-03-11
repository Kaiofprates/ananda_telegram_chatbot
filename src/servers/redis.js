let redis  = require('redis');
let client  = redis.createClient();

client.on('connect', function(){
    console.log('Redis connected'); 
});


const getCache = (key) => {
    return new Promise((resolve,reject)=>{
    client.get(key,(err,value)=>{
    if(err){
        reject(err);
    }else{
        resolve(value);
    }
    });
    }); 
}

const setCache = (key,value) => {
    return new Promise((resolve,reject)=>{
        client.set(key,value,'EX', 180,(err)=>{
            if(err){
                reject(err);
            }else{
                resolve(true);
            }
        })
    })
}

module.exports = {
    setCache,
    getCache
}