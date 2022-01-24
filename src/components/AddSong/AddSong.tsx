import axios from "axios";
import { useState } from "react";

function AddSong(): JSX.Element {
  const [songInput, setSongInput] = useState<string>("");
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  console.log(process.env.REACT_APP_CLIENT_ID);

  function getTrackDetails() {
    // Api call for retrieving token
    axios.post("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(
            process.env.REACT_APP_CLIENT_ID +
              ":" +
              process.env.REACT_APP_CLIENT_SECRET
          ).toString("base64"),
      },
      data: "grant_type=client_credentials",
    });
  }
  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a song URI"
          aria-label="Song URI"
          aria-describedby="button-addon2"
          value={songInput}
          onChange={(e) => setSongInput(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          id="button-addon2"
          onClick={() => console.log(songInput)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default AddSong;
