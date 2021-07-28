const request = require('request');
const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYW5raXR0ZXN0IiwiYSI6ImNrcmxodDk2cTBtOHEycGw3ZnI5cXR1cmsifQ.KLKErhCGdZiYuv9NvAPfBw";
    request({ url: url , json:true},(error, res) => {
            if(error){
                callback('Unable to connect location service !',undefined);
            }            
            else if(res.body.error){
                callback('Unable to find location !',undefined);
            }
            else{
                callback(undefined, {
                    latitude : res.body.features[0].center[1],
                    longitude : res.body.features[0].center[0],
                    location : res.body.features[0].place_name,
                })
            }
        })
}

module.exports = geocode