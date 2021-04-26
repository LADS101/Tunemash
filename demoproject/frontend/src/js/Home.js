import '../css/Home.css';

function Home() {
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

          <form class="example" action="action_page.php">
            <input type="text" placeholder="Search for the song" name="search"></input>
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Home;