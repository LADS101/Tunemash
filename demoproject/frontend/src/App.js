import './App.css';
import Tabs from "./components/Tabs";
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {RangeStepInput} from 'react-range-step-input';


function App() {

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
  },[])

  const submitReview = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      movieName: movieName,
      movieReview: Review
    });
  }

  const selectSong = () => {
    alert("Reached select fn");
    alert(Danceability)
    alert(document.getElementById("SearchSongName").value)
    Axios.get('http://localhost:3002/api/get', {
      params: {
        SongName: document.getElementById("SearchSongName").value,
        Danceability: Danceability,
      }
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

  const createSong = () => {
    Axios.post('http://localhost:3002/api/insert', {
      SongName: document.getElementById("SongName").value,
      Year: parseInt(document.getElementById("Year").value),
      SongID: document.getElementById("SongID").value,
      Duration: parseInt(document.getElementById("Duration").value),
      Acousticness: parseFloat(document.getElementById("Acousticness").value),
      Danceability: parseFloat(document.getElementById("Danceability").value),
      Instrumentalness: parseFloat(document.getElementById("Instrumentalness").value),
      Popularity: parseInt(document.getElementById("Popularity").value),
      Speechiness: parseFloat(document.getElementById("Speechiness").value),
      Tempo: parseInt(document.getElementById("Tempo").value),
      Valence: parseFloat(document.getElementById("Valence").value),
    });
    var acousticness = document.getElementById("Acousticness");
    alert(typeof((parseFloat(acousticness.value))));
    // var x = document.getElementById("Acousticness")
    // alert(x.value);
  }

  const updateSong = () => {
    alert("Song updated");
  }

  const deleteSong = () => {
    alert("Song deleted")
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

  return (

    
    <div className="App">

    <b> <h1> TUNEMASH </h1> </b>

      <Tabs> 
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


                    <button onClick={selectSong}> Search</button>

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
            <div label="Reviews"> 
              create
              read
              update
              delete
              search 
            </div> 
            <div label="Artists"> 
              create
              read
              update
              delete
              search 
            </div>
            <div label="Search History"> 
              create
              read
              update
              delete
              search
            </div> 
            
          </Tabs> 

              
    </div>
  )

  }


export default App;
