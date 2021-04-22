const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


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

app.get("/api/get", (require, response) => {
    const tempo = parseFloat(require.query.T);
    const danceability = parseFloat(require.query.D);

    // const tempo = 155;
    // const danceability = 0.5;

    console.log(tempo);
    console.log(danceability);

    const ltempo = tempo - 5;
    const utempo = tempo + 5;
    const ldance = danceability - 0.1;
    const udance = danceability + 0.1;

    const sqlSelect = "SELECT * FROM `Query` WHERE (`Tempo` >= ? AND `Tempo` <= ?) OR (`Danceability` >= ? AND `Danceability` <= ?) LIMIT 5";
    db.query(sqlSelect, [ltempo, utempo, ldance, udance], (err, result) => {
        if (err) {
            console.log("Reached error")
            console.log(err);

        }
        //console.log(result);

        response.send(result);
        console.log("pls work");
    })

});

app.post("/api/insert", (require, response) => {
    const QueryID = require.body.QueryID;
    const Username = require.body.Username;
    const Date = require.body.Date;
    const QueryString = require.body.QueryString;
    const Year = require.body.Year;
    const Acousticness = require.body.Acousticness;
    const Danceability = require.body.Danceability;
    const Duration_ms = require.body.Duration_ms
    const Instrumentalness = require.body.Instrumentalness;
    const Popularity = require.body.Popularity;
    const Speechiness = require.body.Speechiness;
    const Tempo = require.body.Tempo;
    const Valence = require.body.Valence;

    const sqlInsert = "INSERT INTO `Query` (`QueryID`, `Username`, `Date`, `QueryString`," +
        "`Year`, `Acousticness`, `Danceability`, `Duration_ms`,`Instrumentalness`, `Popularity`, " +
        "`Speechiness`, `Tempo`, `Valence`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

    db.query(sqlInsert, [QueryID, Username, Date, QueryString,
        Year, Acousticness, Danceability, Duration_ms, Instrumentalness, Popularity,
        Speechiness, Tempo, Valence], (err, result) => {
            if (err)
                console.log(err);

            response.send(result);
        })
});

app.delete("/api/delete:Username", (require, response) => {
    const username = require.params.Username;

    const sqlDelete = "DELETE FROM `Query` WHERE `Username` = ?";
    db.query(sqlDelete, username, (err, result) => {
        if (err)
            console.log(err);
        console.log(result);
        response.send(result);
    })
});

app.put("/api/update", (require, response) => {
    const initQuery = require.body.InitQuery;
    const changedQuery = require.body.UpdatedQuery;

    console.log(initQuery)
    console.log(changedQuery)

    const sqlUpdate = "UPDATE `Query` SET `QueryString` = ? WHERE `QueryString`= ?";
    db.query(sqlUpdate, [changedQuery, initQuery], (err, result) => {
        if (err)
            console.log(err);
        response.send(result)
    })
});

app.get("/api/complex", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlUpdate = "SELECT q.Date AS query_date, q.Username AS username, q.QueryString AS queried_song " +
    "FROM Query q JOIN Song s ON q.QueryString = s.Name " +
    "WHERE s.Year > 1970 " +

    "UNION " +

    "SELECT q.Date AS query_date, q.Username AS username, q.QueryString AS queried_song " +
    "FROM Query q JOIN Song s ON q.QueryString = s.Name " +
    "WHERE s.Popularity > 10 " +

    "ORDER BY query_date ASC " +
    "LIMIT 15";
    db.query(sqlUpdate, function (err, result) {
        if (err)
            console.log(err);
        response.send(result)
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})