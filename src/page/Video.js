import React from 'react';
import '../css/style.css';

const videoList = [
  "//player.bilibili.com/player.html?aid=12821567&cid=21073310&page=1",
  "//player.bilibili.com/player.html?aid=9232222&cid=15254263&page=1",
  "//player.bilibili.com/player.html?aid=12717895&cid=20913188&page=1",
  "//player.bilibili.com/player.html?aid=11350752&cid=18770269&page=1",
]

const Video = () => (
  <div className="row">
    <div className="col-md-10 col-md-offset-1">
      {videoList.map((video) =>{ 
        return (
          <iframe src={video} key={video}></iframe>
        )
      })}
    </div>
  </div>
)

export { Video }