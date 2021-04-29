import '../css/Home.css';
import Axios from 'axios';

function Home() {

  const selectSongByName = () => {
    alert("Getting here");
    alert(document.getElementById("search").value)
    Axios.get('http://localhost:3002/api/getByName', {
      params: {
      SongName: document.getElementById("search").value
      }
    }).then((response) => {

      alert("getting here");
      
      document.getElementById("songSearchResult").innerHTML = JSON.stringify(response.data);

      console.log(JSON.stringify(response.data));
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
    </div>
  );
}

export default Home;