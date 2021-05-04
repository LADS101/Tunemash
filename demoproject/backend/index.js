const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const { OAuth2Client } = require('google-auth-library')
const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';
const client = new OAuth2Client(clientId)


const googleAuth = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payLoad = ticket.getPayload();
    console.log('User ' + payLoad.name + ' verified');

    const { sub, email, name, picture } = payLoad;
    const userId = sub;
    return { userId, email, fullName: name, photoUrl: picture };
};

module.exports = googleAuth;


var db = mysql.createConnection({
    host: '35.239.133.63',
    user: 'root',
    password: 'tm-group42',
    database: 'tunemash',
})

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/getAuth", (require, response) => {
    // alert("Reached the getAuth")
    // console.log(require)
    tokenID = require.headers.authorization
    console.log(tokenID)
    // googleAuth(tokenID)



    response.send(googleAuth(tokenID))

    console.log(googleAuth(tokenID))


});



app.post("/api/insertReview", (require, response) => {

    const songName = require.body.Song;

    const songReview = require.body.Review
    const songRating = parseInt(require.body.Ratings)
    console.log(songName)


    const sqlInsert = "INSERT INTO Reviews (`Song`, `Review`, `Ratings`)" +
        " VALUES (?,?,?)";

    db.query(sqlInsert, [songName, songReview, songRating], (err, result) => {
            if (err)
                console.log(err);

            response.send(result);
        })
});





app.get("/api/getReview", (require, response) => {

    //const songName = require.params.SongName
    const songName = require.query.SongName
    
    // const tempo = 155;
    // const danceability = 0.5;
    console.log(songName + " something")

    const sqlSelect = "SELECT * FROM `Reviews` Where `Song` = ?" 
    db.query(sqlSelect, [songName], (err, result) => {
        if (err) {
            console.log("Reached error")
            console.log(err);

        }
        //console.log(result);

        response.send(result);
        console.log("pls work");
    })

});




app.get("/api/get", (require, response) => {
    const Year = parseInt(require.query.Year);
    const Danceability = parseFloat(require.query.Danceability);
    const Acousticness = require.query.Acousticness;
    const Duration_ms = require.query.Duration_ms;
    const Instrumentalness = require.query.Instrumentalness;
    const Tempo = require.query.Tempo;
    const Valence = require.query.Valence;
    const Speechiness = require.query.Speechiness;

    const lYear = Year - 15;
    const hYear = Year + 15;

    const lDanceability = Danceability - 0.2;
    const hDanceability = Danceability + 0.2;

    const lAcousticness = Acousticness - 0.2;
    const hAcousticness = Acousticness + 0.2;

    const lDuration_ms = Duration_ms - 15000;
    const hDuration_ms = Duration_ms + 15000;

    const lInstrumentalness = Instrumentalness - 0.2;
    const hInstrumentalness = Instrumentalness + 0.2;

    const lTempo = Tempo - 20;
    const hTempo = Tempo + 20;

    const lValence = Valence - 0.2;
    const hValence = Valence + 0.2;

    const lSpeechiness = Speechiness - 0.2;
    const hSpeechiness = Speechiness + 0.2;



    const sqlSelect = "SELECT * FROM `Song` WHERE `Year` BETWEEN ? AND ? " +
                                            "AND `Danceability` BETWEEN ? AND ? " + 
                                            "AND `Acousticness` BETWEEN ? AND ? " +
                                            "AND `Duration_ms` BETWEEN ? AND ? " +
                                            "AND `Instrumentalness` BETWEEN ? AND ? " + 
                                            "AND `Tempo` BETWEEN ? AND ? " + 
                                            "AND `Valence` BETWEEN ? AND ? " + 
                                            "AND `Speechiness` BETWEEN ? AND ? LIMIT 5";
    db.query(sqlSelect, [lYear, hYear, 
                        lDanceability, hDanceability,
                        lAcousticness, hAcousticness,
                        lDuration_ms, hDuration_ms,
                        lInstrumentalness, hInstrumentalness,
                        lTempo, hTempo,
                        lValence, hValence,
                        lSpeechiness, hSpeechiness], (err, result) => {
        if (err) 
        console.log(err);

        response.send(result);
    })

});

app.get("/api/getByName", (require, response) => {
    const name = (require.query.SongName).toString();

    console.log(typeof(name));

    console.log(name)

    const sqlSelect = "SELECT * FROM `Song` WHERE `Name` = ?";

    db.query(sqlSelect, [name], (err, result) => {
        if (err) 
        console.log(err);

        console.log("Reached after error");
        console.log(JSON.stringify(result));

        response.send(result);
    })

});


app.get("/api/getSpecial", (require, response) => {
    console.log("JI")
    const val = parseInt(require.query.Number);
    db.query(`CALL Result(?)`, [val], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        // var i;
        // for (i = 0; i < results[0].length; i++)
        //     console.log(JSON.stringify(results[0][i]));
        
        response.send(results[0])
    });
});



app.post("/api/insert", (require, response) => {
    const SongName = require.body.SongName;
    const Acousticness = require.body.Acousticness;
    const Danceability = require.body.Danceability;
    const Duration_ms = require.body.Duration_ms;
    const SongID = require.body.SongID;
    const Instrumentalness = require.body.Instrumentalness;
    const Popularity = require.body.Popularity;
    const Tempo = require.body.Tempo;
    const Valence = require.body.Valence;
    const Year = require.body.Year;
    const Speechiness = require.body.Speechiness;

    const sqlInsert = "INSERT INTO `Song` (`Acousticness`, `Danceability`, `Duration_ms`, `SongID`," +
    "`Instrumentalness`, `Name`, `Popularity`, `Speechiness`,`Tempo`, `Valence`, `Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    db.query(sqlInsert, [Acousticness, Danceability, Duration_ms, SongID
                            , Instrumentalness, SongName, Popularity, Speechiness
                                , Tempo, Valence, Year], (err, result) => {
        if (err)
            console.log(err);

        response.send(result);
    
    })
});

app.delete("/api/delete/:Songname", (require, response) => {
    const Songname = require.params.Songname;

    const sqlDelete = "DELETE FROM `Song` WHERE `Name`= ?";
    db.query(sqlDelete, Songname, (err, result) => {
        if (err) 
            console.log(err);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})