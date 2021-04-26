import '../css/About.css';
import { useEffect, useState } from "react";

function About() {

  return (
    <div className="about">
      <div class="content">
        <p class="lead">
          With the rise of social media apps such as TikTok and YouTube,
          people have started exploring different types of short form content.
          One of the biggest trends are song mashups, where different songs with
          the same characteristics are mixed together to create earworms. Our
          project is aimed towards the music producer market, with an emphasis
          on short form creators. We aim to create a product where a user can
          just input a song of their choice, or musical factors such tempo and
          acoustics, to find the perfect songs to mash up. We will suggest songs
          from our Spotify database which match the song/criteria that the user
          inputs, and vice versa.
        </p>
      </div>
    </div>
  );
}

export default About;