import "../css/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">

      <link rel="stylesheet" href="navbar.css"></link>
      <h1>Tunemash</h1>
      <a href="/Home" button class="Home">Home </a>
      <a href="/Song" button class="Song">Song</a>
      <a href="/About" button class="About">About</a>
      <a href="/Contact" button class="Contact">Contact Us</a>

    </nav>
  );
}

export default Navbar;