require("dotenv").config();
var request = require('request');
var keys = require("./keys.js");
var moment = require("moment");
moment().format();

var concert = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsintown.id + "&date=upcoming";
   request(queryURL, function(error, response, body){
    
    var obj = JSON.parse(body);
    
    if(obj[0]){
    var ven = obj[0].venue;
    console.log(`VENUE NAME: \n${ven.name}`);
    console.log(`LOCATION: \n${ven.city}, ${ven.region.length != "" ? ven.region : ven.country}`);
    console.log(`DATE: \n${moment(obj[0].datetime).format("MMMM DD YYYY")}`);
    }else{
        console.log("No concert found. :(")
    }
   });
}

var spotify = function(song){
    
}

var movie = function(movie){

}

var parseTxt = function(txt){

}

if (process.argv.length > 2) {
    switch (process.argv[2].toLowerCase()) {
        case "concert-this":
            if (process.argv.length > 3) {
                var artist = [];
                for(let i = 3; i < process.argv.length; i++){
                    artist.push(process.argv[i]);
                }
                concert(artist.join("%20").toLowerCase());
            }else{
                console.log("Please enter an artist.");
            }
            break;
        case "spotify-this-song":
            break;
        case "movie-this":
            break;
        case "do-what-it-says":
            break;
        default:
            console.log("ERROROROROOROROROR");
            break;
    }
}else{
    console.log("Give me some inputs!;")
}


