import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { IPopularTrack } from "../../interfaces/ITrack";
import { capitalize } from "../../utils/capitalize";
import "./Popular.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

function Popular(): JSX.Element {
  const baseURL = process.env.REACT_APP_BASE_URL ?? "http://localhost:4000";
  const [popularSongs, setPopularSongs] = useState<IPopularTrack[]>([]);
  const [unpopularSongs, setUnpopularSongs] = useState<IPopularTrack[]>([]);
  const [refreshSpin, setRefreshSpin] = useState(false);

  const getPopularSongs = useCallback(async () => {
    // Api call for retrieving token
    const resp = await axios.get(`${baseURL}/songs/popular`);
    setPopularSongs(resp.data.data.popular);
    setUnpopularSongs(resp.data.data.unpopular);
  }, [baseURL]);

  function handleRefresh() {
    setRefreshSpin(true);
    getPopularSongs();
    setTimeout(() => setRefreshSpin(false), 500);
  }

  useEffect(() => {
    getPopularSongs();
  }, [getPopularSongs]);
  return (
    <div className="container popular-container mt-5">
      <div className="table-header">
        <h1>Popular</h1>
        <button
          type="button"
          className="btn btn-dark btn-sm"
          onClick={() => handleRefresh()}
        >
          Refresh{" "}
          <FontAwesomeIcon
            icon={faRedo}
            className={refreshSpin ? `fa-spin` : ""}
            size="sm"
          />
        </button>
      </div>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col" style={{ width: "5%" }}>
              #
            </th>
            <th scope="col" style={{ width: "20%" }}>
              Song name
            </th>
            <th scope="col" style={{ width: "20%" }}>
              Artists
            </th>
            <th scope="col" style={{ width: "50%" }}>
              Genres
            </th>
            <th scope="col" style={{ width: "5%" }}>
              Likes
            </th>
          </tr>
        </thead>
        <tbody>
          {popularSongs.map((song, index) => {
            return (
              <tr key={song.uri}>
                <th scope="row">{index + 1}</th>
                <td>{song.name}</td>
                <td>{song.artists}</td>
                <td>
                  {song.genres
                    .split(", ")
                    .map((genre) => capitalize(genre))
                    .join(", ")}
                </td>
                <td style={{ textAlign: "center" }}>{song.difference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1>Unpopular</h1>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col" style={{ width: "5%" }}>
              #
            </th>
            <th scope="col" style={{ width: "20%" }}>
              Song name
            </th>
            <th scope="col" style={{ width: "20%" }}>
              Artists
            </th>
            <th scope="col" style={{ width: "50%" }}>
              Genres
            </th>
            <th scope="col" style={{ width: "5%" }}>
              Likes
            </th>
          </tr>
        </thead>
        <tbody>
          {unpopularSongs.map((song, index) => {
            return (
              <tr key={song.uri}>
                <th scope="row">{index + 1}</th>
                <td>{song.name}</td>
                <td>{song.artists}</td>
                <td>
                  {" "}
                  {song.genres
                    .split(", ")
                    .map((genre) => capitalize(genre))
                    .join(", ")}
                </td>
                <td style={{ textAlign: "center" }}>{song.difference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Popular;
