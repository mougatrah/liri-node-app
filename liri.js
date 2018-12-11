require("dotenv").config();
var Spotify = require("node-spotify-api");
var request = require('request');
var keys = require("./keys.js");
var moment = require("moment"); 
var fs = require("fs");
moment().format();

var spotify = new Spotify(keys.spotify);

var concert = function (artist) {
    console.log("Searching for concert...")
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsintown.id + "&date=upcoming";
    request(queryURL, function (error, response, body) {

        if(error){
            console.log(error);
        }else{
            
        var obj = JSON.parse(body);

        if (obj[0]) {
            var ven = obj[0].venue;
            logData(`Concert:` + 
            `\nLineup: ${obj[0].lineup}` +
            `\nVenue: ${ven.name}` +
            `\nLocation: ${ven.city}, ${ven.region.length != "" ? ven.region : ven.country}` +
            `\nDate: ${moment(obj[0].datetime).format("MMMM DD YYYY")}`);
          
        } else {
            console.log("No concert found. :(")
        }
        }
    });
}


var movie = function (movie) {
    console.log("Searching for a movie...")
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body) {
        var obj = JSON.parse(body);

        logData(`Movie:` +
            `\nTitle: ${obj.Title}` +
        `\nYear: ${obj.Year}` +
        `\nIMDB Rating: ${obj.imdbRating}` +
        `\nRotten Rating: ${obj.Ratings[1].Value}` +
        `\nCountry: ${obj.Country}` +
        `\nLanguage: ${obj.Language}` +
        `\nPlot:\n ${obj.Plot}` +
        `\nActors: ${obj.Actors}`);
        
})
}

var searchSpotify = function(query){
    if (query) {
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
}

var displayTrack = function (data) {
    var track = data.tracks.items[0];
    logData(`Song:` +
        `\nArtist: ${track.artists[0].name}` +
    `\nTitle: ${track.name}` +
    `\nLink: ${track.external_urls.spotify}` +
    `\nAlbum: ${track.album.name}`)
   
  

}

var logData = function(data){
    console.log(data);
    fs.appendFile("log.txt", data + "\n\n", function (err) {
        if (err) {
            console.log(err);
        }
    })
}

var liri = function (cmd, query) {
    switch (cmd) {
        case "concert-this":
            if (query) {
                concert(query);
            } else {
                console.log("Please enter an artist.");
            }
            break;
        case "spotify-this-song":
            console.log("Searching for a song.")
            searchSpotify(query);
            break;
        case "movie-this":
            if (query) {
                movie(query);
            } else {
                movie("mr%20nobody");
            }

            break;

        default:
            console.log("ERROR! Possible commands:\nconcert-this \nspotify-this-song\nmovie-this\ndo-what-it-says");
            break;
    }
}

if (process.argv.length > 2) {
    if (process.argv[2].toLowerCase() === "do-what-it-says") {
        fs.readFile("./random.txt", function (err, data) {

            var terms = data.toString().split(",");
           
            liri(terms[0], terms[1]);
        });

    } else {
        if (process.argv.length > 3) {
            var query = []
            for (let i = 3; i < process.argv.length; i++) {
                query.push(process.argv[i]);
            }
            liri(process.argv[2].toLowerCase(), query.join("%20").toLowerCase());
        } else {
            liri(process.argv[2].toLowerCase(), "");
        }
    }


} else {
    console.log("Possible commands:\nconcert-this \nspotify-this-song\nmovie-this\ndo-what-it-says");

}


