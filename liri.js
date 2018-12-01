require("dotenv").config();
var Spotify = require("node-spotify-api");
var request = require('request');
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
moment().format();

var spotify = new Spotify(keys.spotify);

var concert = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsintown.id + "&date=upcoming";
    request(queryURL, function (error, response, body) {

        var obj = JSON.parse(body);

        if (obj[0]) {
            var ven = obj[0].venue;
            console.log(`VENUE NAME: \n${ven.name}`);
            console.log(`LOCATION: \n${ven.city}, ${ven.region.length != "" ? ven.region : ven.country}`);
            console.log(`DATE: \n${moment(obj[0].datetime).format("MMMM DD YYYY")}`);
        } else {
            console.log("No concert found. :(")
        }
    });
}


var movie = function (movie) {

}

var displayTrack = function (data) {
    var track = data.tracks.items[0];
    console.log(`Artist:\n${track.artists[0].name}`);
    console.log(`Title:\n${track.name}`);
    console.log(`Link:\n${track.external_urls.spotify}`);
    console.log(`Album:\n${track.album.name}`);

}

var parseTxt = function (txt) {

}
var liri = function (cmd, query) {

    switch (cmd) {
        case "concert-this":
            if(query){
                concert(query);
            } else {
                console.log("Please enter an artist.");
            }
            break;
        case "spotify-this-song":
          if(query){
                spotify.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }

                    displayTrack(data);
                });
            } else {
                spotify.search({ type: 'track', query: "the sign", limit: 1 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    displayTrack(data);
                });
            }
            break;
        case "movie-this":
                movie(query);
            
            break;

        default:
            console.log("ERROR! Possible commands:");
            console.log("concert-this \nspotify-this-song\nmovie-this\ndo-what-it-says");
            break;
    }
}

if (process.argv.length > 2) {
    if (process.argv[2].toLowerCase() === "do-what-it-says") {
        fs.readFile("./random.txt", function (err, data) {

            var terms = data.toString().split(",");
            console.log(terms[0])
            liri(terms[0], terms[1]);
        });

    } else {
        if (process.argv.length > 3) {
            var query = []
            for (let i = 3; i < process.argv.length; i++) {
                query.push(process.argv[i]);
            }
            liri(process.argv[2].toLowerCase(), query.join("%20").toLowerCase());
        }
    }


} else {
    console.log("Possible commands:");
    console.log("concert-this \nspotify-this-song\nmovie-this\ndo-what-it-says");

}


