import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { ITrackDB } from "../../interfaces/ITrack";
import "./TinderContainer.css";

function TinderContainer(): JSX.Element {
  const baseURL = process.env.REACT_APP_BASE_URL ?? "http://localhost:4000";
  const [lastDirection, setLastDirection] = useState<string>();
  const [songList, setSongList] = useState<ITrackDB[]>();
  const [currentSong, setCurrentSong] = useState<ITrackDB>();

  const getSongList = useCallback(async () => {
    // Api call for retrieving token
    const resp = await axios.get(`${baseURL}/songs`);
    setSongList(resp.data);
    setCurrentSong(resp.data[resp.data.length - 1]);
  }, [baseURL]);

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
    if (songList) {
      songList.pop();
      setSongList([...songList]);
      setCurrentSong(songList[songList.length - 1]);
    }
  };

  useEffect(() => {
    getSongList();
  }, [getSongList]);

  return (
    <div className="tinder-container">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>SongSwipe</h1>
      <div className="cardContainer">
        {songList &&
          songList.map((song) => (
            <TinderCard
              className="swipe"
              key={song.name}
              onSwipe={(dir) => swiped(dir, song.name)}
              onCardLeftScreen={() => outOfFrame(song.name)}
            >
              <div
                style={{ backgroundImage: "url(" + song.album_art + ")" }}
                className="card"
              >
                <h3>{song.name}</h3>
              </div>
            </TinderCard>
          ))}
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText">Swipe to like or dislike a song</h2>
      )}
      {currentSong ? (
        <iframe
          id="spotify-iframe"
          title="spotify-player"
          src={`https://open.spotify.com/embed/track/${currentSong.uri}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      ) : (
        <iframe
          id="spotify-iframe"
          title="spotify-player"
          src="about:blank"
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      )}
    </div>
  );
}

export default TinderContainer;
