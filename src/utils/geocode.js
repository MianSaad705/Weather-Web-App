const request=require('request');


const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWlhbjcwNSIsImEiOiJja2M5ODRlaHYxNmJnMnlxZWJhczkzY2RxIn0.JyzIsJnf4XorGhYW-y2lCQ&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Cannot Connect with mapbox api!',undefined);
        }
        else if(body.features.length===0){
            callback('Cannot find the Place try another One!',undefined)
        }
        else{
            callback(undefined,{
                 latitude:body.features[0].center[1],
                 longitude:body.features[0].center[0],
                 location:body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode