const request = require('request');
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=8d3f4cbc939c27e97de1a8d56557664a&query='+ latitude + ',' + longitude;
    request({ url: url , json:true},(error, res) => {
            if(error){
                callback('Unable to connect weather service !',undefined);
            }            
            else if(res.body.erro){
                callback('Unable to find location !',undefined);
            }
            else{
                callback(undefined,
                    // res.body.daily.data[0].summary + 'It is current rain out. there is '+res.body.currently.precipProbability + ' % chnace of rain'
                    res.body.current.humidity + ' It is current rain out. there is ' + res.body.current.precip + '% chance of rain'
                    );
            }
        })
}

module.exports = forecast