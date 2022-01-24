import axios from "axios";
import { useEffect, useState } from "react";
import { IArtist, ITrack } from "../../interfaces/ITrack";
import AddSongPreview from "../AddSongPreview/AddSongPreview";

function AddSong(): JSX.Element {
  const baseURL = process.env.REACT_APP_BASEURL ?? "https://localhost:3000";
  const [songInput, setSongInput] = useState<string>("3F0mcxksBp33QrL6oyjvLN");
  const [token, setToken] = useState("");
  const [searchedSong, setSearchedSong] = useState<ITrack>();

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
    //check response -> try catch
    console.log(resp.data);

    const artists = resp.data.artists.map((artist: IArtist) => ({
      name: artist.name,
      id: artist.id,
      uri: artist.uri,
    }));
    setSearchedSong({
      name: resp.data.name,
      artists: artists,
      uri: resp.data.id,
      album: resp.data.album.name,
      album_art: resp.data.album.images[1].url,
      release_date: resp.data.album.release_date,
      popularity: resp.data.popularity,
    });
  }

  async function addTrackDetails() {
    // Api call for posting new entry into /tracks table
    const resp = await axios.post(baseURL, {
      //data here
    });
    //check response -> try catch
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
          aria-describedby="add-song-search-button"
          value={songInput}
          onChange={(e) => setSongInput(e.target.value)}
        />
        <button
          className="btn btn-dark"
          type="button"
          id="add-song-search-button"
          onClick={() => getTrackDetails()}
        >
          Search
        </button>
        {searchedSong && <AddSongPreview song={searchedSong} />}
      </div>
    </div>
  );
}

export default AddSong;
