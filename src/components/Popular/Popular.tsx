import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { IPopularTrack } from "../../interfaces/ITrack";
import "./Popular.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import PopularTable from "./PopularTable";

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
    setTimeout(() => setRefreshSpin(false), 1000);
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
      <PopularTable songs={popularSongs} />
      <h1>Unpopular</h1>
      <PopularTable songs={unpopularSongs} />
    </div>
  );
}

export default Popular;
