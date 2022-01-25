import { ITrack } from "../../interfaces/ITrack";

interface IAddSongPreview {
  song: ITrack;
}

function AddSongPreview({ song }: IAddSongPreview): JSX.Element {
  return (
    <div className="container">
      <p>Song Name: {song.name}</p>
      <p>Album Name: {song.album}</p>
      <p>Artists: {song.artists.map((artist) => artist.name).join(", ")}</p>
      <p>Release Date: {song.release_date}</p>
      <p>Popularity: {song.popularity}</p>
      <img src={song.album_art} alt={`album art for ${song.album}`} />
    </div>
  );
}

export default AddSongPreview;
