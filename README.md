# LIRI-APP:

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. 
LIRI will be a command line node app that takes in parameters and gives you back data.

This App will search songs from Spotify's api, concerts of your favourite band or artist from bands in Town's api, and movies from OMDB's api.

There is a switch function manages the four cases the user can call in seperate functions.

1. Spotify Api request: 
To get information from the API I use data queries with the title of the song using a call function and posting it as a console log.
list of datas inquired.
Artists name
Song name
Link for the song on Spotify
Album Name

Image of code in action
<img src="https://ibb.co/vY5zgrk">

----------------------------------------------------------------------------------------------------------------------------------------------
2. Bands in Town Api request: 
To get information from the API I use data queries with the name of the band using a call function and posting it as a console log.
list of datas inquired.
Venue for the cities
Countries of the Venues
Venue name
Time it plays at the Venues


Image of code in action
https://ibb.co/3hF7mKB


----------------------------------------------------------------------------------------------------------------------------------------------
3. OMDB Api request: 
To get information from the API I use data queries with the title of the movie using a call function and posting it as a console log. I also added a defualt movie, in case you dont want to choose.
list of datas inquired.
Title of the movie
year of the movie released
IMDB rating
Rotten tomatoes score
Country of the movies production
All languages the movie is translated in, and original
Plot tag
list of main actors


Image of code in action
https://ibb.co/XZymR47
https://ibb.co/0VbGkQr



----------------------------------------------------------------------------------------------------------------------------------------------
4.There is also a random function. This functions uses a series of math functions to give you a random number of the three choices above.
It calls a random movie, artist, etc from the random.txt file to get information. 

Image of code in action
https://ibb.co/3mmW04B
https://ibb.co/rmxcgtQ
https://ibb.co/BZLGxjP


----------------------------------------------------------------------------------------------------------------------------------------------

5.  There is one last function that apends all the user responses to the file log.txt with fs require.

Image of code in action
https://ibb.co/QjsKLbH
