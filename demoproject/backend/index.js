const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'35.239.133.63',
    user: 'root',
    password:'tm-group42',
    database:'tunemash',
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

app.get("/api/get", (require, response) => {
    const name = require.query.SongName;
    const danceability = parseFloat(require.query.Danceability);

    console.log(name);
    console.log(danceability);

    const sqlSelect = "SELECT * FROM Song WHERE `Name` = `?` AND `Danceability` = ?";
    db.query(sqlSelect, [name, danceability], (err, result) => {
        if (err) 
        console.log(err);

        response.send(result);

    })

});

app.post("/api/insert", (require, response) => {
    const SongName = require.body.SongName;
    const Acousticness = require.body.Acousticness;
    const Danceability = require.body.Danceability;
    const Duration_ms = require.body.Duration;
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
        console.log(err);
    })
});

app.delete("/api/delete/:movieName", (require, response) => {
    const movieName = require.params.movieName;

    const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
    db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

