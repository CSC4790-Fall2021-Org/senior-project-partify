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
var bodyParser = require('body-parser');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'f56457379527434d853f72398ed3cf86'; // Your client id
var client_secret = 'aab21add02d247949bc17de570abd36f'; // Your secret
var redirect_uri = 'http://localhost:4200/callback'; // Your redirect uri

var SpotifyWebApi = require('spotify-web-api-node');

// Creates the spotify node.js wrapper that will be used to call api methods
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

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

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, DELETE, HEAD, OPTIONS");
  next();
});

app.use(cors({
  origin: '*'
}));

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/getData', (req, res) => {
  res.json({
    "statusCode":200,
    "statusMessage":"SUCCESS"
  })
})

app.get('/randomPlaylist', (req, res) => {
  var dict = [];
  spotifyApi.getUserPlaylists({limit: 50}).then(
    (data) => {
      var playlists = data.body.items
      var count = 0;
      playlists.forEach(element => {
        console.log(element['name'])
        dict[count] = element['id'];
        count++;
      });
      res.send(data)
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
})

// This is what is called at the log in page
app.get('/login', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  // application requests authorization using wrapper
  console.log(client_id)
  console.log(redirect_uri)
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-read-playback-state', 'playlist-modify-public', 'playlist-modify-private'];
  console.log('check header ', res);
  res.redirect('http://accounts.spotify.com/authorize' + 
    '?response_type=code&client_id=' + client_id + (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&state=' + encodeURIComponent(state));
  
});

// This is the page that is loaded up after logging in
app.post('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.body.code || null;
  var state = req.body.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.send(failure)
  } else {
    res.clearCookie(stateKey);

    // This method returns access token
    spotifyApi.authorizationCodeGrant(code)
      .then( (data) => {
        var access_token = data.body['access_token'];
        var refresh_token = data.body['refresh_token'];
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        console.log('I got here');
        res.send({"message": "Authorization set"});
      },
      (err) => {
        console.log('Something went wrong!', err);
      });
  }
});

app.post('/getSongs', function(req, res) {
  let playlist_id = req.body.playlist_id
  spotifyApi.getPlaylistTracks(playlist_id, {limit: 50}).then(
    (data) => {
      res.send(data)
    }, (err) => {
      console.log('Something Went Wrong', err)
    }
  )
});

app.post('/getRecSongs', function(req, res) {
  let playlist_id = req.body.playlist_id;
  spotifyApi.getPlaylistTracks(playlist_id, {limit: 5}).then(
    (data) => {
      let seed_ids = []
      let songs = data.body.items
      songs.forEach(song => {
        seed_ids.push(song.track.id)
      });
      spotifyApi.getRecommendations({seed_tracks: seed_ids, limit: 5}).then(
        (data) => {
          res.send(data)
        }, (err) => {
          console.log('Something went wrong', err)
        }
      )

    }, (err) => {
      console.log('Something Went Wrong', err)
    }
  )
  // spotifyApi.getRecommendations()
})

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

app.post('/algorithm', function(req, res) {
  console.log('this is the playlist id yes ', req.body.playlist_id);
  res.send({"message": "Playlist was sent"});
  this.getSongInfo(req.body.playlist_id, req.body.option);
});

removeSongs = (playlist, track) => {
  spotifyApi.removeTracksFromPlaylist(playlistId=playlist, tracks=track)
}

addSongs = (playlist, track) => {
  spotifyApi.addTracksToPlaylist(playlistId=playlist, tracks=track)
}

// grabs user's playlist
getSongInfo = (playlist, option) => {
  spotifyApi.getPlaylist(playlist).then(
    (data) => {
      // var res = spotifyApi.getPlaylist(playlist).then(
      //   (data) => {
      //     var playlist_name = res.body.name;
      //     console.log("Playlist id: ", playlist);
      //     console.log(playlist_name);
      //   }     
      // );
      var playlist_name = res.body.name
      console.log("Playlist id: ", playlist);
      console.log(playlist_name);
      var track_ids = [];
      spotifyApi.getPlaylistTracks(data.body.id, {limit: 50}).then(
        (data) => {
          var track_arr = data.body.items;
          track_arr.forEach(songInfo => {
            var track_id = songInfo.track.id;
            track_ids.push(track_id);
          });
          getAudioFeature(track_ids, option);
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

getAudioFeature = (track_ids, option) => {
  spotifyApi.getAudioFeaturesForTracks(track_ids).then(
    (data) => {
      var arr_energy_ids = [];
      var track_features = data.body.audio_features;
      if (option === '1') {
        track_features.forEach(features => {
          arr_energy_ids.push({'id': features.id, 'danceability': features.danceability});
        });
        arr_energy_ids.sort((a,b) => {
          let energyA = a.danceability;
          let energyB = b.danceability;
          if (energyA < energyB ) {
            return -1;
          }
          else if (energyA > energyB) {
            return 1;
          }
          return 0;
        });
        sortingAlgorithm(arr_energy_ids);
      }
      if (option === '2') {
        track_features.forEach(features => {
          arr_energy_ids.push({'id': features.id, 'tempo': features.tempo});
        });
        arr_energy_ids.sort((a,b) => {
          let energyA = a.tempo;
          let energyB = b.tempo;
          if (energyA < energyB ) {
            return -1;
          }
          else if (energyA > energyB) {
            return 1;
          }
          return 0;
        });
        sortingAlgorithm(arr_energy_ids);
      }
      if (option === '3') {
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
      }
      if (option === '4') {
        tracks = [];
        track_features.forEach(features => {
          let key = features.key;
          let mode = features.mode;
          if (mode === 0) {
            if (key === 0) {
              tracks.push({'id': features.id, 'camKey': 5, 'mode': mode});
            }
            if (key === 1) {
              tracks.push({'id': features.id, 'camKey': 12, 'mode': mode});
            }
            if (key === 2) {
              tracks.push({'id': features.id, 'camKey': 7, 'mode': mode});
            }
            if (key === 3) {
              tracks.push({'id': features.id, 'camKey': 2, 'mode': mode});
            }
            if (key === 4) {
              tracks.push({'id': features.id, 'camKey': 9, 'mode': mode});
            }
            if (key === 5) {
              tracks.push({'id': features.id, 'camKey': 4, 'mode': mode});
            }
            if (key === 6) {
              tracks.push({'id': features.id, 'camKey': 11, 'mode': mode});
            }
            if (key === 7) {
              tracks.push({'id': features.id, 'camKey': 6, 'mode': mode});
            }
            if (key === 8) {
              tracks.push({'id': features.id, 'camKey': 1, 'mode': mode});
            }
            if (key === 9) {
              tracks.push({'id': features.id, 'camKey': 8, 'mode': mode});
            }
            if (key === 10) {
              tracks.push({'id': features.id, 'camKey': 3, 'mode': mode});
            }
            if (key === 11) {
              tracks.push({'id': features.id, 'camKey': 10, 'mode': mode});
            }
          }
          if (mode === 1) {
            if (key === 0) {
              tracks.push({'id': features.id, 'camKey': 8, 'mode': mode});
            }
            if (key === 1) {
              tracks.push({'id': features.id, 'camKey': 3, 'mode': mode});
            }
            if (key === 2) {
              tracks.push({'id': features.id, 'camKey': 10, 'mode': mode});
            }
            if (key === 3) {
              tracks.push({'id': features.id, 'camKey': 5, 'mode': mode});
            }
            if (key === 4) {
              tracks.push({'id': features.id, 'camKey': 12, 'mode': mode});
            }
            if (key === 5) {
              tracks.push({'id': features.id, 'camKey': 7, 'mode': mode});
            }
            if (key === 6) {
              tracks.push({'id': features.id, 'camKey': 2, 'mode': mode});
            }
            if (key === 7) {
              tracks.push({'id': features.id, 'camKey': 9, 'mode': mode});
            }
            if (key === 8) {
              tracks.push({'id': features.id, 'camKey': 4, 'mode': mode});
            }
            if (key === 9) {
              tracks.push({'id': features.id, 'camKey': 11, 'mode': mode});
            }
            if (key === 10) {
              tracks.push({'id': features.id, 'camKey': 6, 'mode': mode});
            }
            if (key === 11) {
              tracks.push({'id': features.id, 'camKey': 1, 'mode': mode});
            }
          }
        });
        camelotPlaylist(tracks);
      }
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
}

camelotPlaylist = (tracks) => {

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
