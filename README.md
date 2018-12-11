# LIRI
##  LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### Searches using specific APIs to log info to the console and to a log.txt file.

## Features

Search for concerts by artist.  
Search for songs on spotify.  
Search for info on movies.  
Parse a text file for commands.  

## Setup

In order to run LIRI on your machine you must provide a .env file.  
The .env file should contain your [Spotify](https://developer.spotify.com/dashboard/applications) and [Bands In Town](http://www.artists.bandsintown.com/bandsintown-api) API keys like so:  
```
SPOTIFY_ID=#######
SPOTIFY_SECRET=######

BANDSINTOWN=#######
```



You will need to navigate to the root folder and run `npm install`.
![npm install](./imgs/npm.png)  

You can also edit the random.txt file. Make sure to format it like so:  
_command_**,**_search term_

## Using LIRI

Possible commands:

- concert-this <artist>  
 Searches BandsInTown for the next concert available for the artist provided.

  ![concert](./imgs/concert.png)

- spotify-this-song <song title>  
Searches Spotify for info on the song title provided. If no song title is provided, LIRI will search Spotify for 'The Sign'.
  
  ![song](./imgs/song.png)

- movie-this <movie title>  
Searches OMDB for info on the movie provided. If no movie title is provided, LIRI will search OMDB for 'Mr Nobody'.  
  
  ![movie](./imgs/movie.png)

- do-what-it-says  
Will parse the random.txt file for a command and search term.

  ![random](./imgs/random.png)
  
## Log

LIRI will save your search results in a log.txt file.  
![log](./imgs/log.png)



