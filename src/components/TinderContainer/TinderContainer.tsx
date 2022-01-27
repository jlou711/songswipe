import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { ITrackDB } from "../../interfaces/ITrack";
import "./TinderContainer.css";
import { shuffle } from "../../utils/shuffle";

function TinderContainer(): JSX.Element {
  const baseURL = process.env.REACT_APP_BASE_URL ?? "http://localhost:4000";
  const [lastDirection, setLastDirection] = useState<string>();
  const [songList, setSongList] = useState<ITrackDB[]>([]);
  const [currentSong, setCurrentSong] = useState<ITrackDB>();
  const [loading, setLoading] = useState(true);

  const getSongList = useCallback(async () => {
    // Api call for retrieving token
    const resp = await axios.get(`${baseURL}/songs`);
    setSongList(shuffle(resp.data.data));
    setCurrentSong(resp.data.data[resp.data.data.length - 1]);
  }, [baseURL]);

  const updateLikes = useCallback(
    async (dir, uri) => {
      const option = dir === "right" ? "likes" : "dislikes";
      await axios.put(`${baseURL}/songs/${uri}/${option}`);
    },
    [baseURL]
  );

  const swiped = (direction: string) => {
    setLastDirection(direction);
  };

  const outOfFrame = () => {
    if (songList) {
      songList.pop();
      setSongList([...songList]);
      setCurrentSong(songList[songList.length - 1]);
      setLoading(true);
    }
  };

  const hideSpinner = () => {
    setLoading(false);
  };

  useEffect(() => {
    getSongList();
  }, [getSongList]);

  return (
    <div className="tinder-container">
      <h1>SongSwipe</h1>
      <div className="cardContainer">
        {songList &&
          songList.map((song) => (
            <TinderCard
              className="swipe"
              key={song.uri}
              onSwipe={(dir) => {
                swiped(dir);
                updateLikes(dir, song.uri);
              }}
              onCardLeftScreen={() => outOfFrame()}
            >
              <div
                style={{ backgroundImage: "url(" + song.album_art + ")" }}
                className="card"
              >
                <h3>{song.name}</h3>
              </div>
            </TinderCard>
          ))}
        {songList.length === 0 && (
          <TinderCard className="swipe">
            <div
              style={{ backgroundImage: "url(/blank_album_art.jpeg)" }}
              className="card"
            ></div>
          </TinderCard>
        )}
      </div>
      {songList.length === 0 ? (
        <h2 className="infoText">You've reached the end of the list!</h2>
      ) : lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText">Swipe to like or dislike a song</h2>
      )}
      {loading ? (
        <FontAwesomeIcon
          icon={faSync}
          className="loading-spinner fa-spin"
          size="2x"
        />
      ) : null}
      {currentSong ? (
        <iframe
          id="spotify-iframe"
          title="spotify-player"
          src={`https://open.spotify.com/embed/track/${currentSong.uri}`}
          width="30%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={hideSpinner}
          style={{ display: loading ? "none" : "" }}
        ></iframe>
      ) : (
        <iframe
          id="spotify-iframe"
          title="spotify-player"
          src="about:blank"
          width="30%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={hideSpinner}
        ></iframe>
      )}
    </div>
  );
}

export default TinderContainer;
