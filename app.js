/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'f56457379527434d853f72398ed3cf86'; // Your client id
var client_secret = 'f56457379527434d853f72398ed3cf86'; // Your secret
var redirect_uri = 'http://localhost:4200/home'; // Your redirect uri

var SpotifyWebApi = require('spotify-web-api-node');

// Creates the spotify node.js wrapper that will be used to call api methods
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});
console.log("lol");

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/getData', (req, res) => {
  res.json({
    "statusCode":200,
    "statusMessage":"SUCCESS"
  })
})

app.get('/randomPlaylist', (req, res) => {
  spotifyApi.getPlaylist('3cEYpjA9oz9GiPac4AsH4n')
  .then(function(data) {
    console.log('Some information about this playlist', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

// This is what is called at the log in page
app.get('/login', function(req, res) {
  // application requests authorization using wrapper
  console.log(client_id)
  console.log(redirect_uri)
  var scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-read-playback-state', 'playlist-modify-public', 'playlist-modify-private'];
  res.redirect('https://accounts.spotify.com/authorize' + 
    '?response_type=code&client_id=' + client_id + (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

// This is the page that is loaded up after logging in
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);

    // This method returns access token
    spotifyApi.authorizationCodeGrant(code)
      .then( (data) => {
        var access_token = data.body['access_token'];
        var refresh_token = data.body['refresh_token'];
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        res.redirect('/#' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
      },
      (err) => {
        console.log('Something went wrong!', err);
      });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  spotifyApi.refreshAccessToken()
    .then((data) => {
      var access_token = data.body.access_token;
      res.send({
        'access_token': access_token
      });
    });
});

app.get('/algorithm', function(req, res) {
  this.algorithm();
});

algorithm = () => {
  var dict = [];

  spotifyApi.getUserPlaylists().then(
    (data) => {
      var playlists = data.body.items
      var count = 0;
      playlists.forEach(element => {
        dict[count] = element['id'];
        count++;
      });
     getSongInfo(dict);
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
}

// grabs user's first playlist
getSongInfo = (playlists) => {
  spotifyApi.getPlaylist(playlists[0]).then(
    (data) => {
      var track_ids = [];
      spotifyApi.getPlaylistTracks(data.body.id).then(
        (data) => {
          var track_arr = data.body.items;
          track_arr.forEach(songInfo => {
            var track_id = songInfo.track.id;
            track_ids.push(track_id);
          });
          getAudioFeature(track_ids);
        },
        (err) => {
          console.log('Something went wrong!', err);
        }
      );
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
}

getAudioFeature = (track_ids) => {
  spotifyApi.getAudioFeaturesForTracks(track_ids).then(
    (data) => {
      var arr_energy_ids = [];
      var track_features = data.body.audio_features;
      track_features.forEach(features => {
        arr_energy_ids.push({'id': features.id, 'energy': features.energy});
      });
      arr_energy_ids.sort((a,b) => {
        let energyA = a.energy;
        let energyB = b.energy;
        if (energyA < energyB ) {
          return -1;
        }
        else if (energyA > energyB) {
          return 1;
        }
        return 0;
      });
      sortingAlgorithm(arr_energy_ids);
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
}

sortingAlgorithm = (tracks) => {
  var t1 = [],
      t2 = [];
  var c = 0;
  for(var track in tracks) {
    if( (c % 2) === 0) {
      t1.push(tracks[c]);
    } else {
      t2.push(tracks[c]);
    }
    c++;
  }
  var mid1 = t1.length / 2;
  var mid2 = t2.length / 2;
  var play1 = t1.slice(0, mid1);
  var play2 = t1.slice(mid1, t1.length+1);
  var play3 = t2.slice(0, mid2);
  var play4 = t2.slice(mid2, t2.length+1);
  var c2 = 0;
  var t3 = [];
  var t4 = [];
  for(var y in play2) {
    if( (c2 % 2) === 0) {
      t3.push(play2[y]);
    } else {
      t4.push(play2[y]);
    }
    c2++;
  }
  var c3 = 0;
  var t5 = [];
  var t6 = [];
  for(var y in play4) {
    if( (c3 % 2) === 0) {
      t5.push(play4[y]);
    } else {
      t6.push(play4[y]);
    }
    c3++;
  }
  t4.reverse();
  t6.reverse();
  play3.reverse();
  var final = play1.concat(t3, t4, t5, t6, play3);
  console.log(final);
  var final_songIds = [];
  for(var i in final) {
    final_songIds.push("spotify:track:" + final[i].id);
  }
  var playlistName = 'Partified Playlist';
  spotifyApi.createPlaylist(playlistName, {'collaborative': false, 'public': true}).then(
    (data) => {
      spotifyApi.getUserPlaylists().then(
        (data) => {
          var playlists = data.body;
          var playId = playlists.items[0].id;
          spotifyApi.addTracksToPlaylist(playId, final_songIds).then(
            (data) => {
              console.log('It was a success!! I hope...');
            },
            (err) => {
              console.log('Something went wrong', err);
            }
          )
        },
        (err) => {
          console.log('Something went wrong!', err);
        }
      );
    },
    (err) => {
      console.log('Something went wrong!', err)
    }
  );
}

console.log('Listening on 8888');
app.listen(8888);