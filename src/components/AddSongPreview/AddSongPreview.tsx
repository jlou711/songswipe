import { ITrack } from "../../interfaces/ITrack";

interface IAddSongPreview {
  song: ITrack;
  addTrackDetails: () => void;
}

function AddSongPreview({
  song,
  addTrackDetails,
}: IAddSongPreview): JSX.Element {
  return (
    <div className="container">
      <p>Song Name: {song.name}</p>
      <p>Album Name: {song.album}</p>
      <p>
        Artists: {song.artists.map((artist) => artist.artist_name).join(", ")}
      </p>
      <p>Release Date: {song.release_date}</p>
      <p>Popularity: {song.popularity}</p>
      <img src={song.album_art} alt={`album art for ${song.album}`} />
      <button onClick={addTrackDetails}>Add Song</button>
    </div>
  );
}

export default AddSongPreview;
