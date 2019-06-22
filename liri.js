require("dotenv").config();
let keys = require("./keys.js");
let fs = require("fs");
let axios = require("axios");
let moment = require('moment');
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

let action = process.argv[2];
let value;
if (process.argv[3]) {
    value = process.argv.slice(3);
}


function SwitchTopic() {

    switch (action) {

        case 'concert-this':
            bandsInTown(value);
            break;

        case 'spotify-this-song':
            spotSong(value);
            break;

        case 'movie-this':
            movieInfo(value);
            break;

        case 'do-what-it-says':
            getRandom();
            break;

    };



    function bandsInTown(value) {
        console.log(value)
        axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
            .then(function (response) {
               
                for (let i = 0; i < response.data.length; i++) {
                    logText("-------------------------------------------");
                    logText(response.data[i].venue.city);
                    logText(response.data[i].venue.country);
                    logText(response.data[i].venue.name);
                    logText(moment(response.data[i].datetime).format('MM DD YYYY'));
                    logText("-------------------------------------------");

                }
            })
    };

    function spotSong(value) {

        spotify.search({ type: 'track', query: value }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            logText("-------------------------------------------");
            logText("Artist: " + data.tracks.items[0].artists[0].name);
            logText("Song's Name: " + data.tracks.items[0].name);
            logText("Link of the song from Spotify" + data.tracks.items[0].external_urls.spotify);
            logText(data.tracks.items[0].album.name);
            logText("-------------------------------------------");
        })


    };

    function movieInfo(value) {
    
        if (value === undefined) {
            
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=Mr+Nobody")
                .then(function (response) {
                    let { Title, Year, imdbRating, Country, Language, Plot, Actors } = response.data;
                   logText("-------------------------------------------");
                   logText("Title of the movie: " + Title);
                   logText("Year the movie came out: " + Year);
                   logText("IMDB Rating of the movie: " + imdbRating);
                   logText("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                   logText("Country where the movie was produced: " + Country);
                   logText("Languages: " + Language);
                   logText("Plot: " + Plot);
                   logText("Actors: " + Actors);
                   logText("-------------------------------------------");

                });
        } else {
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + value)
                .then(function (response) {

                    let { Title, Year, imdbRating, Country, Language, Plot, Actors } = response.data;
                   logText("-------------------------------------------");
                   logText("Title of the movie: " + Title);
                   logText("Year the movie came out: " + Year);
                   logText("IMDB Rating of the movie: " + imdbRating);
                   logText("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                   logText("Rotten Tomatoes Rating of the movie: " );
                   logText("Country where the movie was produced: " + Country);
                   logText("Languages: " + Language);
                   logText("Plot: " + Plot);
                   logText("Actors: " + Actors);
                   logText("-------------------------------------------");
                }).catch( e => console.log(e))
        }


    };

    function getRandom() {

        var getRandomCase = Math.floor(Math.random() * 3) * 2
        

        fs.readFile('random.txt', "utf8", function (error, data) {
            

            if (error) {
                return console.log(error);
            }


            const dataArr = data.split(",");
            const option = dataArr[getRandomCase]
            const search = dataArr[getRandomCase+ 1]
          

            if (option === 'spotify-this-song') {
                
                spotSong(search);

            } else if (option === 'concert-this') {

                bandsInTown([search]);

            }
            else if (option === 'movie-this') {
                movieInfo(search);
            }



    });

    };


    function logText(dataToLog){
        console.log(dataToLog)
        fs.appendFile("log.txt", dataToLog + `\n`, function(err) {
         if (err) return logText("Data is appended to file successfully.");
    
        });
    };
   



};

SwitchTopic();







