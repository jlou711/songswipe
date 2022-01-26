import axios from "axios";
import { useEffect, useState } from "react";
import { ITrack } from "../../interfaces/ITrack";
import { IArtist, IArtistDB } from "../../interfaces/IArtist";
import AddSongPreview from "../AddSongPreview/AddSongPreview";
import "./AddSong.css";
import { toast } from "react-toastify";

function AddSong(): JSX.Element {
  const baseURL = process.env.REACT_APP_BASE_URL ?? "http://localhost:4000";
  const [songInput, setSongInput] = useState<string>("04QTmCTsaVjcGaoxj8rSjE");
  const [token, setToken] = useState("");
  const [searchedSong, setSearchedSong] = useState<ITrack>();

  const showToastError = (str: string) => {
    toast.error(str);
  };

  const showToastSuccess = (str: string) => {
    toast.success(str);
  };

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
    const songResp = await axios(
      `https://api.spotify.com/v1/tracks/${songInput}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    // Construct params for GET Several Artists Spotify API
    const artistList = songResp.data.artists
      .map((artist: IArtist) => artist.id)
      .join("%2C");

    const artistsResp = await axios(
      `https://api.spotify.com/v1/artists?ids=${artistList}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const artists: IArtistDB[] = artistsResp.data.artists.map(
      (artist: IArtist) => ({
        artist_name: artist.name,
        artist_uri: artist.id,
        genres: artist.genres,
      })
    );

    setSearchedSong({
      name: songResp.data.name,
      artists: artists,
      uri: songResp.data.id,
      album: songResp.data.album.name,
      album_art: songResp.data.album.images[1].url,
      release_date: songResp.data.album.release_date,
      popularity: songResp.data.popularity,
    });
  }

  async function addTrackDetails() {
    // Api call for posting new entry into /tracks table
    try {
      if (searchedSong) {
        const resp = await axios.post(`${baseURL}/songs`, {
          uri: searchedSong.uri,
          name: searchedSong.name,
          album: searchedSong.album,
          album_art: searchedSong.album_art,
          release_date: searchedSong.release_date,
          artists: searchedSong.artists,
        });
        showToastSuccess("Your song has been added 🎶");
        console.log(resp);
        setSongInput("");
        setSearchedSong(undefined);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        switch (e.response.status) {
          case 400:
            // Duplicate
            showToastError(
              "Looks like you tried to add a song that already exists!"
            );
            break;
          default:
            // Server error
            showToastError("Oops! Something went wrong, please try again!");
        }
      } else {
        console.log(e);
      }
    }
  }
  return (
    <>
      <div className="container add-song">
        <h3>To add a song, enter a song URI into the input below</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a song URI.."
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
        </div>
        {searchedSong && (
          <AddSongPreview
            song={searchedSong}
            addTrackDetails={addTrackDetails}
          />
        )}
      </div>
    </>
  );
}

export default AddSong;
