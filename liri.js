require("dotenv").config();
var request = require('request');
var keys = require("./keys.js");

var concert = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
   request.get(queryURL).on("response", function(response){
       console.log(JSON.stringify(response, null, 2))
   })
}

var spotify = function(song){
    
}

var movie = function(movie){

}

var parseTxt(txt){

}

if (process.argv[2]) {
    switch (process.argv[2].toLowerCase()) {
        case "concert-this":
            if (process.argv[3]) {
                concert(process.argv[3].toLowerCase());
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
}


