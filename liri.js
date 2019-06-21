require("dotenv").config();
let keys = require("./keys.js");
let fs = require("fs");
let axios = require("axios");
let moment = require('moment');
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

let action = process.argv[2];
let value; 
if ( process.argv[3]){
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

        // default:
        //     logIt("Invalid parameter");
        //     break;

    };



    function bandsInTown(value) {
        axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
            .then(function (response) {
                // console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    console.log("-------------------------------------------");
                    console.log(response.data[i].venue.city);
                    console.log(response.data[i].venue.country);
                    console.log(response.data[i].venue.name);
                    console.log(moment(response.data[i].datetime).format('MM DD YYYY'));
                    console.log("-------------------------------------------");

                }
            })
    };

    function spotSong(value) {
      
        spotify.search({ type: 'track', query: value }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("-------------------------------------------");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song's Name: " + data.tracks.items[0].name);
            console.log("Link of the song from Spotify" + data.tracks.items[0].external_urls.spotify);
            console.log(data.tracks.items[0].album.name);
            console.log("-------------------------------------------");
        })


    };

    function movieInfo(value) {
        if(value === undefined) {
            console.log("we are running Mr Nobody")
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=Mr+Nobody")
                .then(function (response) {
                    console.log(response.data);

                    let { Title, Year, imdbRating, Country, Language, Plot, Actors } = response.data;
                    console.log("-------------------------------------------");
                    console.log("Title of the movie: " + Title);
                    console.log("Year the movie came out: " + Year);
                    console.log("IMDB Rating of the movie: " + imdbRating);
                    console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                    console.log("Country where the movie was produced: " + Country);
                    console.log("Languages: " + Language);
                    console.log("Plot: " + Plot);
                    console.log("Actors: " + Actors);
                    console.log("-------------------------------------------");

                });
        } else {
            axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + value)
                .then(function (response) {

                    let { Title, Year, imdbRating, Country, Language, Plot, Actors } = response.data;
                    console.log("-------------------------------------------");
                    console.log("Title of the movie: " + Title);
                    console.log("Year the movie came out: " + Year);
                    console.log("IMDB Rating of the movie: " + imdbRating);
                    console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                    console.log("Country where the movie was produced: " + Country);
                    console.log("Languages: " + Language);
                    console.log("Plot: " + Plot);
                    console.log("Actors: " + Actors);
                    console.log("-------------------------------------------");
                });
        }


    };

    function getRandom() {

        var getRandomCase = Math.floor(Math.random()*3)*2 
        // console.log(getRandomCase);
        
        fs.readFile('random.txt', "utf8", function(error, data){
        
            if (error) {
                return console.log(error);
              }
        
          
            const dataArr = data.split(",");
            
            if (dataArr[0] === "spotify-this-song") {
                const songcheck = dataArr[1].trim();
                console.log("the songcheck varialbe is ", { songcheck })
                spotSong(songcheck);
            
                }else if (dataArr[2] === "concert-this") {
                   
                    if (dataArr[3].charAt(3) === "'") {
                        const artisCheck = dataArr[3].trim();
                        console.log("the artist varialbe is ", { artisCheck })
                        spotSong(artisCheck);
                    }
                    else
                      {
                          let bandName = dataArr[1].trim();
                          console.log(bandName);
                          bandsInTown(bandName);
                      }
                        
                    } 
                    else if(dataArr[0] === "movie-this") 
                    {
                      let movie_name = dataArr[1].trim().slice(1, -1);
                      movieInfo(movie_name);
                    } 
            
            
            
            });
        
        };
        

};

SwitchTopic();









// else if (dataArr[0] === "concert-this") 
// { 
//   if (dataArr[1].charAt(1) === "'")
//   {
//       let dLength = dataArr[1].length - 1;
//       let data = dataArr[1].substring(2,dLength);
//       console.log(data);
//       bandsInTown(dLength);
//   }
//   else
//   {
//       let bandName = dataArr[1].trim();
//       console.log(bandName);
//       bandsInTown(bandName);
//   }
    
// } 
// else if(dataArr[0] === "movie-this") 
// {
//   let movie_name = dataArr[1].trim().slice(1, -1);
//   movieInfo(movie_name);
// } 



   
            // if(dataArr[2] === "concert-this")
            // console.log("this is my value" , dataArr);
            // {
            //     const artisCheck =dataArr[3].trim();
            //     console.log("the songcheck varialbe is ", {artisCheck})
            //     bandsInTown(artisCheck);

            // }
