import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ITrack } from "../../interfaces/ITrack";
import "./AddSongPreview.css";

interface IAddSongPreview {
  song: ITrack;
  addTrackDetails: () => void;
}

function AddSongPreview({
  song,
  addTrackDetails,
}: IAddSongPreview): JSX.Element {
  return (
    <>
      <div className="add-song-preview-header">
        <h5>Click the tick if this looks right!</h5>
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="confirm-song-btn"
          size="lg"
          onClick={addTrackDetails}
        />
      </div>
      <div className="container add-song-preview">
        <div className="preview-album-art">
          <img
            src={song.album_art}
            className="img-fluid rounded-start rounded-end"
            alt={`album art for ${song.album}`}
          />
        </div>
        <div className="card-body">
          <h4 className="card-title">{song.name}</h4>
          <p className="card-text">Album: {song.album}</p>
          <p className="card-text">
            Artists:{" "}
            {song.artists.map((artist) => artist.artist_name).join(", ")}
          </p>
          <p className="card-text">
            <small className="text-muted">
              Release Date: {song.release_date}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">Popularity: {song.popularity}</small>
          </p>
        </div>
      </div>
    </>
  );
}

export default AddSongPreview;
