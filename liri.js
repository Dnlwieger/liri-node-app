var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


var getTweets = function() {

    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'Lando12parsecs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    
        for (var i=0; i<tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log(' ');
            console.log(tweets[i].text);
        }
    }
    });
}    


var getSpotify = function(songName) {
var spotify = new Spotify(keys.spotifyKeys);
        
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        
        if (err) {
        return console.log('Error occurred: ' + err);
        } 
            var songs = data.tracks.items;
            for(var i=0; i<songs.length; i++){
                console.log(" " + i);
                console.log("");
                console.log(" Artist(s): " + songs[i].artists[0].name);
                console.log(" Song Title: " + songs[i].name);
                console.log(" Album: " + songs[i].album.name);
                console.log(" Preview: " + songs[i].preview_url);
                console.log("__________________________________________________________");
                console.log("");
            }    
    });
}


var getOmdb = function(movieName) {

        
        request('http://www.omdbapi.com/?t='+ movieName + '&apikey=40e9cece&', function (error, response, body) {
            if (error) {
                return console.log('Error occurred: ' + error);
                }
        var jsonData = JSON.parse(body);
        console.log("");
        console.log("Title: " + jsonData.Title);
        console.log("-----------------------------------------");
        console.log("Year: " + jsonData.Year);
        console.log("-----------------------------------------");
        console.log("IMDB Score: " + jsonData.imdbRating);
        console.log("-----------------------------------------");
        console.log("Rotten Tomatoes Score: " + jsonData.Ratings[1].Value);
        console.log("-----------------------------------------");
        console.log("Country: " + jsonData.Country);
        console.log("-----------------------------------------");
        console.log("Language: " + jsonData.Language);
        console.log("-----------------------------------------");
        console.log("Plot: " + jsonData.Plot);
        console.log("-----------------------------------------");
        console.log("Actors: " + jsonData.Actors);
        console.log("");
        });
};

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

            if (dataArr.length == 2) {
                userChoice(dataArr[0], dataArr[1]);
            } else if (dataArr.length ==1) {
                userChoice(dataArr[0]);
            } 
    });
}

var userChoice = function(caseData, functionData) {
    
        switch(caseData) {
            case 'my-tweets' :
                getTweets();
                break;
            case 'spotify-this-song':
                getSpotify(functionData);
                break;
            case 'movie-this':
                getOmdb(functionData);
                break;
            case 'do-what-it-says':
                doWhatItSays();    
                break;        
            default:
            console.log("LIRI doesn't know this command.");    
        }
}

var userArg = function(argOne, argTwo) {
    userChoice(argOne, argTwo);
}

userArg(process.argv[2], process.argv[3]);