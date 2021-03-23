const request = require("request");


const foreCast=(lat,lang,callback)=>{
const url='https://api.openweathermap.org/data/2.5/weather?lat='+ lat+'&lon='+ lang +'&units=metric&appid=9c2a18bcadd6e30a0e976b149b73fa53';

request({url,json:true},(error,{body})=>{
    if(error){
                callback('Unable To Connect With OpenWeather Api!',undefined);
            }
            else if(body.message){
                callback('Unable to find geoCode!',undefined);
            }
            else{
                callback(undefined, 'It is current '+body.main.temp_max+' degress Out! And there is '+body.weather[0].description +' ');
            }
})
}
module.exports=foreCast

