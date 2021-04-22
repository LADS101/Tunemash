import { RangeStepInput } from 'react-range-step-input';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';


const Song = () => {
  const [movieName, setMovieName] = useState('');
  const [Review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  const [SongName, setSongName] = useState("");
  const [SongID, setSongID] = useState("");
  const [Year, setYear] = useState(2010);
  const [Acousticness, setAcousticness] = useState(0.5);
  const [Duration, setDuration] = useState(100);
  const [Danceability, setDanceability] = useState(0.5);
  const [Instrumentalness, setInstrumentalness] = useState(0.5);
  const [Popularity, setPopularity] = useState(5);
  const [Speechiness, setSpeechiness] = useState(0.2);
  const [Tempo, setTempo] = useState(50);
  const [Valence, setValence] = useState(0.5);


  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setMovieReviewList(response.data)
    })
  }, [])

  const submitReview = () => {
    Axios.post('http://localhost:3002/api/insert', {
      movieName: movieName,
      movieReview: Review
    });
  }

  const selectSong = () => {
    // alert("Danceability: " + Danceability)
    // alert("Tempo: "+ Tempo)

    // alert(document.getElementById("SearchSongName").value)
    Axios.get('http://localhost:3002/api/get', {
      params: {
        T: Tempo,
        D: Danceability,
      }
    }).then((response) => {
      // alert(response.data.toString());
      // alert("Reached here")
      // console.log("Back in app.js")
      document.getElementById("searchResult").innerHTML = JSON.stringify(response.data)

      console.log(JSON.stringify(response.data));
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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    alert(today)
    alert(typeof (today))
    Axios.post('http://localhost:3002/api/insert', {
      QueryID: parseInt(document.getElementById("QueryID").value) || '',
      Username: document.getElementById("Username").value,
      Date: today,
      QueryString: document.getElementById("QueryString").value,
      Year: parseInt(document.getElementById("Year").value) || -1,
      Acousticness: parseFloat(document.getElementById("Acousticness").value) || -1,
      Danceability: parseFloat(document.getElementById("Danceability").value) || -1,
      Duration_ms: parseInt(document.getElementById("Duration_ms").value) || -1,
      Instrumentalness: parseFloat(document.getElementById("Instrumentalness").value) || -1,
      Popularity: parseInt(document.getElementById("Popularity").value) || -1,
      Speechiness: parseFloat(document.getElementById("Speechiness").value) || -1,
      Tempo: parseInt(document.getElementById("Tempo").value) || -1,
      Valence: parseFloat(document.getElementById("Valence").value) || -1,
    }).then((response) => {
      // alert(response.data.toString());
      alert("Reached here")
      alert(response.data)
      console.log(response.data);
    }).catch((err) => {
      alert("Reached here error")
      console.log(err)
    })

    // var x = document.getElementById("Acousticness")
    // alert(x.value);
  }

  const updateSong = () => {
    alert("Song updated");
    const iQ = document.getElementById("query_update").value
    const uQ = document.getElementById("query_changed").value

    alert(iQ)
    alert(uQ)
    Axios.put(`http://localhost:3002/api/update`, {
      InitQuery: iQ,
      UpdatedQuery: uQ
    });
  }

  const deleteSong = () => {
    alert("Related feed deleted")
    alert(document.getElementById("Username_del").value)
    const Username = document.getElementById("Username_del").value
    Axios.delete(`http://localhost:3002/api/delete${Username}`, {

    }).then((response) => {
      // alert(response.data.toString());
      alert("Reached here")
      alert(response.data)
      console.log(response.data);
    }).catch((err) => {
      alert("Reached here error")
      console.log(err)
    })
  }

  const submitQuery = () => {
    // Axios.post('http://localhost:3002/api/insert', {
    //   movieName: movieName,
    //   movieReview: Review
    // }
    alert("Submit Button was clicked.")
    alert(Danceability)
  }


  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
  };

  const updateReview = (movieName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      movieName: movieName,
      movieReview: newReview
    });
    setNewReview("")
  };

  const getPopularMusic = () => {
    document.body.innerHTML = "PLease"
    alert("Hello World!");

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  return (
      
      <div label="Songs">

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
            <label for="Danceability">Duration:</label>
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

          <form>
            <label for="SongName">Song Name:</label>
            <input type="text" id="SearchSongName" name="SearchSongName"></input><br></br>
          </form>

          <a>Danceability: </a>
          <RangeStepInput min={0} max={1}
            step={0.1}
            onChange={e => {
              setDanceability(e.target.value);
            }}
          />


          {/* <button onClick={selectSong}> Search</button> */}

          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>




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

        </div>

        <div label="Delete">

          <b><h3>Enter Song Name to Delete</h3></b>

          <form>
            <label for="SongName">Song name (to be deleted):</label>
            <input type="text" id="DeleteSongName" name="DeleteSongName"></input><br></br>
          </form>

          <button onClick={deleteSong}> Delete</button>


        </div>
        </div>
  );
}

export default Song;