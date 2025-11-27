import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="media-social">
          <a href="#">
            {/* <img src="/img/icons/facebook.png" /> */}
            Facebook
          </a>
          <a href="#">
            {/* <img src="/img/icons/instagram.png" /> */}
            Instagram
          </a>
          <a href="#">
            {/* <img src="/img/icons/twitter.png" /> */}
            Twitter
          </a>
          <a href="#">
            {/* <img src="/img/icons/youtube.png" /> */}
            YouTube
          </a>
        </div>
        <hr />
        <p className="copyright">&copy;Copyrights Kelompok 4</p>
      </div>
    </footer>
  );
}