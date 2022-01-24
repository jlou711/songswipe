import { useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderContainer.css";

const db = [
  {
    name: "Richard Hendricks",
    url: "https://i.scdn.co/image/ab67616d00001e02cddc25435cb94483d4b7bb45",
    uri: "5gaUkg5JNk8c4mr2jnpX8H",
  },
  {
    name: "Erlich Bachman",
    url: "https://i.scdn.co/image/ab67616d00001e02d90a5bdb27e10249bcc39a02",
    uri: "4N42Ta28mOYeiyMlypgCTK",
  },
  {
    name: "Monica Hall",
    url: "https://i.scdn.co/image/ab67616d00001e02cddc25435cb94483d4b7bb45",
    uri: "4rS4K30qVDExdjeU4feF4c",
  },
  {
    name: "Jared Dunn",
    url: "https://i.scdn.co/image/ab67616d00001e02d90a5bdb27e10249bcc39a02",
    uri: "7k6phfGndOSCfL4TZRtLft",
  },
  {
    name: "Get Down On It",
    url: "https://i.scdn.co/image/ab67616d00001e02cddc25435cb94483d4b7bb45",
    uri: "4yKZACkuudvfd600H2dQie",
  },
];

interface SpotifyTrack {
  name: string;
  url: string;
  uri: string;
}

function TinderContainer(): JSX.Element {
  const [lastDirection, setLastDirection] = useState<string>();
  const [characters, setCharacters] = useState<SpotifyTrack[]>(db);
  const [currentSong, setCurrentSong] = useState<SpotifyTrack>(
    characters[characters.length - 1]
  );

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
    characters.pop();
    setCharacters([...characters]);
    setCurrentSong(characters[characters.length - 1]);
  };

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
        {characters.map((character) => (
          <TinderCard
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
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
