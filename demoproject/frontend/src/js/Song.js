import { RangeStepInput } from 'react-range-step-input';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "../css/Song.css"
import { json } from 'body-parser';

const Song = () => {
  const [movieName, setMovieName] = useState('');
  const [Review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  const [SongName, setSongName] = useState("");
  const [SongID, setSongID] = useState("");
  const [Year, setYear] = useState(1970);
  const [Acousticness, setAcousticness] = useState(0.5);
  const [Duration, setDuration] = useState(300000);
  const [Danceability, setDanceability] = useState(0.5);
  const [Instrumentalness, setInstrumentalness] = useState(0.5);
  const [Popularity, setPopularity] = useState(5);
  const [Speechiness, setSpeechiness] = useState(0.5);
  const [Tempo, setTempo] = useState(122);
  const [Valence, setValence] = useState(0.5);

  const selectSong = () => {
    alert("Running knn")
    Axios.get('http://localhost:3002/api/get', {
      params: {
      Year: Year,
      Acousticness: Acousticness,
      Danceability: Danceability,
      Duration_ms: Duration,
      Instrumentalness: Instrumentalness,
      Speechiness: Speechiness,
      Tempo: Tempo,
      Valence: Valence
      }
    }).then((response) => {
      
      // document.getElementById("searchResult").innerHTML = JSON.stringify(response.data)
      alert(JSON.stringify(response.data))

      var table = document.getElementById("songTableData");
        
        while (table.hasChildNodes()) {
          table.removeChild(table.firstChild);
        }
    
        var initRow = table.insertRow(0);

        for(let index = 1; index < (response.data).length + 1; index++) {
          var row = table.insertRow(index);

          var name = row.insertCell(0);
          var danceability = row.insertCell(1);
          var duration_ms = row.insertCell(2);
          var instrumentalness = row.insertCell(3);
          var acousticness = row.insertCell(4);
          var popularity = row.insertCell(5);
          var speechiness = row.insertCell(6);
          var tempo = row.insertCell(7);
          var valence = row.insertCell(8);
          var year = row.insertCell(9);

          acousticness.innerHTML = response.data[index - 1].Acousticness;
          danceability.innerHTML = response.data[index - 1].Danceability;
          duration_ms.innerHTML = response.data[index - 1].Duration_ms
          instrumentalness.innerHTML = response.data[index - 1].Instrumentalness
          name.innerHTML = response.data[index - 1].Name
          popularity.innerHTML = response.data[index - 1].Popularity
          speechiness.innerHTML = response.data[index - 1].Speechiness
          tempo.innerHTML = response.data[index - 1].Tempo
          valence.innerHTML = response.data[index - 1].Valence
          year.innerHTML = response.data[index - 1].Year

          table.insertRow(row)
        }

        var cell1 = initRow.insertCell(0)
        var cell2 = initRow.insertCell(1)
        var cell3 = initRow.insertCell(2)
        var cell4 = initRow.insertCell(3)
        var cell5 = initRow.insertCell(4)
        var cell6 = initRow.insertCell(5)
        var cell7 = initRow.insertCell(6)
        var cell8 = initRow.insertCell(7)
        var cell9 = initRow.insertCell(8)
        var cell10 = initRow.insertCell(9)

        cell1.innerHTML = " Acousticness "
        cell2.innerHTML = " Danceability "
        cell3.innerHTML = " Duration_ms "
        cell4.innerHTML = " Instrumentalness "
        cell5.innerHTML = " Name "
        cell6.innerHTML = " Popularity "
        cell7.innerHTML = " Speechiness "
        cell8.innerHTML = " Tempo "
        cell9.innerHTML = " Valence "
        cell10.innerHTML = " Year "
        table.insertRow(initRow)

      // console.log(JSON.stringify(response.data));
    }).catch((err) => {
      alert("Reached here error")
      console.log(err)
    })
  }

  const complexSong = () => {
    // alert("Danceability: " + Danceability)
    // alert("Tempo: "+ Tempo)

    // alert(document.getElementById("SearchSongName").value)
    Axios.get('http://localhost:3002/api/complex', {

    }).then((response) => {
      // alert(response.data.toString());
      // alert("Reached here")
      // console.log("Back in app.js")
      document.getElementById("complexResult").innerHTML = JSON.stringify(response.data)

      console.log(JSON.stringify(response.data));
    }).catch((err) => {
      alert("Reached here error")
      console.log(err)
    })
  }

  const createSong = () => {
    Axios.post('http://localhost:3002/api/insert', {
      Year: parseInt(document.getElementById("Year").value),
      SongName: document.getElementById("SongName").value,
      SongID: document.getElementById("SongID").value,
      Acousticness: parseFloat(document.getElementById("Acousticness").value),
      Danceability: parseFloat(document.getElementById("Danceability").value),
      Duration_ms: parseInt(document.getElementById("Duration").value),
      Instrumentalness: parseFloat(document.getElementById("Instrumentalness").value),
      Popularity: parseInt(document.getElementById("Popularity").value),
      Speechiness: parseFloat(document.getElementById("Speechiness").value),
      Tempo: parseInt(document.getElementById("Tempo").value),
      Valence: parseFloat(document.getElementById("Valence").value)
    }).then((response) => {
      alert("Song Created!")
      alert(response.data)
      console.log(response.data);
    }).catch((err) => {
      alert("Reached here error")
      console.log(err)
    })

    // var x = document.getElementById("Acousticness")
    // alert(x.value);
  }

  const deleteSong = () => {
    const Songname = document.getElementById("DeleteSongName").value

    alert(Songname);

    Axios.delete(`http://localhost:3002/api/delete/${Songname}`, {

    }).then((response) => {
      alert("Song Deleted!")
    }).catch((err) => {
      console.log(err)
    })
  }


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function selectSpecialList () {
    document.getElementById("specialResult").innerHTML = ''
    Axios.get('http://localhost:3002/api/getSpecial', {
      params: {
        Number: (getRandomInt(3) + 1)
      }
    }).then((response) => {
      
      var arr =response.data
      var s = ""
      for (var i = 0; i < arr.length; i++){
        var obj = arr[i];
        for (var key in obj){
          var value = obj[key];
          s += " " + key  +   " : " + value + " | "
        }
        document.getElementById("specialResult").innerHTML  += "<br>" + s+ "</b>";
      }

      //document.getElementById("specialResult").innerHTML =  "</b>" +  response.data
      
      //JSON.stringify(response.data)
      // for (i = 0; i < response.length; i++)
      //   console.log(JSON.stringify(response[i]));

    }).catch((err) => {
      alert("Reached here error")
      console.log(err)
    })
  }

  return (
    
      <div label="Songs">
      <link rel="stylesheet" href="../css/Song.css" /> 
        <b><h3>Create Song</h3></b>

        <div label="Create">

          <form>
            <label for="SongName">Song Name:</label>
            <input type="text" id="SongName" name="SongName"></input><br></br>
            <label for="Year">Year:</label>
            <input type="text" id="Year" name="Year"></input><br></br>
            <label for="SongID">Song ID:</label>
            <input type="text" id="SongID" name="SongID"></input><br></br>
            <label for="Acousticness">Acousticness:</label>
            <input type="text" id="Acousticness" name="Acousticness"></input><br></br>
            <label for="Danceability">Danceability:</label>
            <input type="text" id="Danceability" name="Danceability"></input><br></br>
            <label for="Duration">Duration:</label>
            <input type="text" id="Duration" name="Duration"></input><br></br>
            <label for="Instrumentalness">Instrumentalness:</label>
            <input type="text" id="Instrumentalness" name="Instrumentalness"></input><br></br>
            <label for="Popularity">Popularity:</label>
            <input type="text" id="Popularity" name="Popularity"></input><br></br>
            <label for="Speechiness">Speechiness:</label>
            <input type="text" id="Speechiness" name="Speechiness"></input><br></br>
            <label for="Tempo">Tempo:</label>
            <input type="text" id="Tempo" name="Tempo"></input><br></br>
            <label for="Valence">Valence:</label>
            <input type="text" id="Valence" name="Valence"></input><br></br>
          </form>

          <button onClick={createSong}> Submit</button>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>


        <div label="Search">

          <b><h3>Search/Read Song Details</h3></b>

          {/* <form>
            <label for="SongName">Song Name:</label>
            <input type="text" id="SearchSongName" name="SearchSongName" onChange={e => {
              setSongName(e.target.value);
            }}></input><br></br>
          </form> */}

          <a>Year: </a>
          <RangeStepInput min={1920} max={2021}
            step={10}
            onChange={e => {
              setYear(e.target.value);
            }}
          />

          <a>Acousticness: </a>
          <RangeStepInput min={0} max={1}
            step={0.1}
            onChange={e => {
              setAcousticness(e.target.value);
            }}
          />

          <a>Danceability: </a>
          <RangeStepInput min={0} max={1}
            step={0.1}
            onChange={e => {
              setDanceability(e.target.value);
            }}
          />

          <a>Instrumentalness: </a>
          <RangeStepInput min={0} max={1}
            step={0.1}
            onChange={e => {
              setInstrumentalness(e.target.value);
            }}
          />

          <a>Duration (ms): </a>
          <RangeStepInput min={0} max={6000000}
            step={100000}
            onChange={e => {
              setDuration(e.target.value);
            }}
          />

          <a>Speechiness: </a>
          <RangeStepInput min={0} max={1}
            step={0.05}
            onChange={e => {
              setSpeechiness(e.target.value);
            }}
          />

          <a>Tempo: </a>
          <RangeStepInput min={0} max={245}
            step={10}
            onChange={e => {
              setTempo(e.target.value);
            }}
          />

          <a>Valence: </a>
          <RangeStepInput min={0} max={1}
            step={0.1}
            onChange={e => {
              setValence(e.target.value);
            }}
          />

          <button onClick={selectSong}> Search</button>
          <table id="songTableData" class="tableClass"></table>

          {/* <p id="searchResult"></p> */}

          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>



{/* 
        <div label="Update">

          <b><h3>Update Songs by Entering Song Name and updated Details</h3></b>


          <form>
            <label for="SongName">Enter Song name:</label>
            <input type="text" id="UpdateSongName" name="UpdateSongName"></input><br></br>
            <label for="Year">Update year:</label>
            <input type="text" id="UpdateYear" name="UpdateYear"></input><br></br>
            <label for="SongID">Update ID:</label>
            <input type="text" id="SongID" name="UpdateSongID"></input><br></br>
            <label for="Acousticness">Update acousticness:</label>
            <input type="text" id="UpdateAcousticness" name="UpdateAcousticness"></input><br></br>
            <label for="Danceability">Update danceability:</label>
            <input type="text" id="UpdateDanceability" name="UpdateDanceability"></input><br></br>
            <label for="Instrumentalness">Update instrumentalness:</label>
            <input type="text" id="UpdateInstrumentalness" name="UpdateInstrumentalness"></input><br></br>
            <label for="Popularity">Update popularity:</label>
            <input type="text" id="Popularity" name="Popularity"></input><br></br>
            <label for="Speechiness">Update speechiness:</label>
            <input type="text" id="UpdateSpeechiness" name="UpdateSpeechiness"></input><br></br>
            <label for="Tempo">Update Tempo:</label>
            <input type="text" id="UpdateTempo" name="UpdateTempo"></input><br></br>
            <label for="Valence">Update valence:</label>
            <input type="text" id="UpdateValence" name="UpdateValence"></input><br></br>
          </form>

          <button onClick={updateSong}> Update</button>

          <br></br>

        </div> */}

        <div label="Delete">

          <b><h3>Enter Song Name to Delete</h3></b>

          <form>
            <label for="SongName">Song name (to be deleted):</label>
            <input type="text" id="DeleteSongName" name="DeleteSongName"></input><br></br>
          </form>

          <button onClick={deleteSong}> Delete</button>


        </div>



          <div label="Special">

          <b><h3>Special Hits</h3></b>

            <button onClick={selectSpecialList}> Special</button>

          <p id="specialResult"></p>

          </div>

        </div>
  );
}

export default Song;