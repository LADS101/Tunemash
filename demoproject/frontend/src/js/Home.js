
import '../css/Home.css';
import Axios from 'axios';

function Home() {

 
  const selectSongByName = () => {
    alert("Getting here");
    // var table = document.getElementById("tableData");
    // for(var i = 0; i < table.; i++) {
    // document.getElementById("tableData").deleteRow(i -1);
    // }
    alert(document.getElementById("search").value)
    Axios.get('http://localhost:3002/api/getByName', {
      params: {
      SongName: document.getElementById("search").value
      }
    }).then((response) => {

      // alert("getting here");

      // alert(JSON.stringify(response));

        var table = document.getElementById("tableData");
     
        var initRow = table.insertRow(0);
        var cell = initRow.insertCell(0)
        //cell.innerHTML = "<b>" + " Name " + " Danceability " + " Time duration " + " Instrumentalness " + " Popularity " + " Acousticness " +  " Speechines " + " Tempo " + " Valence " + " Year " + "</b>"
        // initRow.insertCell("Name")

        // initRow.insertCell("Danceability")
     
        // initRow.insertCell("Time duration")
        // initRow.insertCell("Instrumentalness")
        // initRow.insertCell("Popularity")
        // initRow.insertCell("Acousticness")
        // initRow.insertCell("Speechines")
        // initRow.insertCell("Tempo")
        // initRow.insertCell("Valence")
        // initRow.insertCell("Year")

       // table.insertRow(initRow)


        for(let index = 1; index < 2; index++) {
            // var newRow = <tr />;
            // var cols = "";
            // var acousticness = '';
            // var danceability = '';
            // var duration_ms = '';
            // var songid = '';
            // var instrumentalness = '';
            // var name = '';
            // var popularity = '';
            // var speechiness = '';
            // var tempo = '';
            // var valence = '';
            // var year = '';
           // var table = document.getElementById("tableData");
            var row = table.insertRow(index);
            var name = row.insertCell(0);
            
            var danceability = row.insertCell(1);
            var duration_ms = row.insertCell(2);
            //var songid = row.insertCell(3);
            var instrumentalness = row.insertCell(3);
            var acousticness = row.insertCell(4);
            var popularity = row.insertCell(5);
            var speechiness = row.insertCell(6);
            var tempo = row.insertCell(7);
            var valence = row.insertCell(8);
            var year = row.insertCell(9);

            // alert(response.data[index].Acousticness)

            acousticness.innerHTML = response.data[index].Acousticness;
            danceability.innerHTML = response.data[index].Danceability;
            duration_ms.innerHTML = response.data[index].Duration_ms
            //songid.innerHTML = response.data[index].SongID
            instrumentalness.innerHTML = response.data[index].Instrumentalness
            name.innerHTML = response.data[index].Name
            popularity.innerHTML = response.data[index].Popularity
            speechiness.innerHTML = response.data[index].Speechiness
            tempo.innerHTML = response.data[index].Tempo
            valence.innerHTML = response.data[index].Valence
            year.innerHTML = response.data[index].Year
               
            // newRow.append(cols);
        // }

      }
      //cell.style.width = "4000px"
      cell.innerHTML = "<b>" + " Name " + " Danceability " + " Time duration " + " Instrumentalness " + " Popularity " + " Acousticness " +  " Speechines " + " Tempo " + " Valence " + " Year " + "</b>"
      table.insertRow(initRow) 
      //document.getElementById("songSearchResult").innerHTML = JSON.stringify(response.data);

     // console.log(JSON.stringify(response.data));
    }).catch((err) => {
      alert("Reached here error")
      console.log(err)
    })
  }



  const submitReview = () => {
    Axios.post('http://localhost:3002/api/insertReview', {
   
        Song: document.getElementById("enterSongName").value,
        Review : document.getElementById("enterSongReview").value,
        Ratings: document.getElementById("enterSongRating").value
    
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


  const getReview = () => {
    console.log( document.getElementById("enterSongName").value)
    Axios.get('http://localhost:3002/api/getReview', {
      params: {
        SongName: document.getElementById("enterSongName").value
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







  return (
    <div className="home">
      <header class="showcase">
        <div class="content">
          <img src="https://image.ibb.co/ims4Ep/logo.png" class="logo" alt="Traversy Media"></img>
          <div class="title">
            Welcome To TuneMash
          </div>

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          </link>

          <p class="lead">
            TuneMash brings your music to life. Find the perfect song for your mashups and TikToks
          </p>

          <div id="searchBar">
            <form id="search Form" class="example">
              <input type="text" placeholder="Search for a song by name" id="search" name="search"></input>
              
            </form>

            {/* NOTE: This button below was actually inside the form, but it didn't work  */}

            <button type="submit" onClick={selectSongByName}><i class="fa fa-search"></i></button>
            
            
          </div>

          <p id="songSearchResult">If you observe no change even after searching, then no song with the entered name exists in our database.</p>


          
        </div>

        
      </header>

  <section class="services">
    <div class="container grid-3 center">
      <div>
        
      <table id="tableData" class="tableClass">
            </table>
      </div>
      
    </div>
  </section>

  <section class="about bg-light">
    <div class="container">
      <div class="grid-2">
        <div class="center">
        <div class="box">
          <div>
        <form id="search Form" class="example">
         <h>Write a review!</h>  
              <input type="text" placeholder="Enter song name" id="enterSongName" name="enterSongName"></input><br></br>
              <input type="text" placeholder="Enter song review" id="enterSongReview" name= "enterSongReview"></input>
              <input type="text" placeholder="Enter song rating" id="enterSongRating" name="enterSongRating"></input>
              
            </form>

            {/* NOTE: This button below was actually inside the form, but it didn't work  */}

            <button type="submit" onClick={submitReview} class="submitButton"> Submit Review for this song</button>
            </div>
            <div> 
{/* 
            <form id="search Form" class="example">
         <h>Get a song's review</h>  
              <input type="text" placeholder="Get Review of Song" id="enterSongName" name="getSongReview"></input><br></br>
              
            <button type="submit" onClick={getReview} class="submitButton">Get Review for this song</button>

            </form>

            NOTE: This button below was actually inside the form, but it didn't work  */}



            </div>

            </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </section>
    </div>
  );
}

export default Home;