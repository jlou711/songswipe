import axios from "axios";
import { useEffect, useState } from "react";

function AddSong(): JSX.Element {
  const [songInput, setSongInput] = useState<string>("");
  const [token, setToken] = useState("");

  useEffect(() => {
    getSpotifyToken();
  }, []);

  async function getSpotifyToken() {
    // Api call for retrieving token
    const resp = await axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.REACT_APP_CLIENT_ID +
              ":" +
              process.env.REACT_APP_CLIENT_SECRET
          ).toString("base64"),
      },
      data: "grant_type=client_credentials",
    });
    setToken(resp.data.access_token);
  }

  async function getTrackDetails() {
    // Api call for retrieving tracks data
    const resp = await axios(`https://api.spotify.com/v1/tracks/${songInput}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    console.log(resp.data);
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
          onClick={() => getTrackDetails()}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default AddSong;
