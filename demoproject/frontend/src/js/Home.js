
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

      alert("getting here");

      // alert(JSON.stringify(response));
        var table = document.getElementById("tableData");
        
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

    }).catch((err) => {
      alert("Reached here error")
      alert(err)
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
    alert("lamo")
    console.log("lmao")
    console.log(document.getElementById("getSongReview").value)
    Axios.get('http://localhost:3002/api/getReview', {
      params: {
        SongName: document.getElementById("getSongReview").value
        }
    }).then((response) => {
      // alert(response.data.toString());
      console.log("before")
      document.getElementById("reviewResult").innerHTML = JSON.stringify(response.data[0])
      alert(JSON.stringify(response.data) + 'plss')
      console.log("Reached here")
      // alert(response.data)
      // console.log(response.data);
    }).catch((err) => {
      alert("Reached here error")
      console.log("err")
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
              <input type="text" placeholder="Search for a song by name" id="search" name="search" style={{width:"300px"}}></input>
              
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

        <form id="search Form" class="example">
        <h>Get a song's review</h>  
          <input type="text" placeholder="Get Review of Song" id="getSongReview" name="getSongReview"></input><br></br>
          <p id="reviewResult"></p>
        </form>
        <button type="submit" onClick={getReview} class="submitButton">Get Review for this song</button>

            {/* NOTE: This button below was actually inside the form, but it didn't work  */}



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