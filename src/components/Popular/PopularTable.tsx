import { IPopularTrack } from "../../interfaces/ITrack";
import { capitalize } from "../../utils/capitalize";

interface IPopularTable {
  songs: IPopularTrack[];
}

function PopularTable({ songs }: IPopularTable): JSX.Element {
  return (
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
        {songs.map((song, index) => {
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
  );
}

export default PopularTable;
