import { useContext } from "react";
import {
  AppContext,
  PlaylistContext,
  SelectedPlaylistContext,
} from "../../App";

export default function Login(): JSX.Element {
  const user = useContext(AppContext);
  const playlists = useContext(PlaylistContext).filter(
    (playlist) => playlist.owner.display_name !== "Spotify"
  );
  const { selectedPlaylist, setSelectedPlaylist } = useContext(
    SelectedPlaylistContext
  );
  return (
    <>
      {user ? (
        <div>
          <a
            className="btn btn-success btn-lg"
            href={process.env.REACT_APP_AUTH_URL}
          >
            Logged in as: {user.name}
          </a>
          <div className="dropdown">
            {selectedPlaylist ? (
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedPlaylist.name}
              </button>
            ) : (
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Playlist
              </button>
            )}
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    setSelectedPlaylist(undefined);
                  }}
                >
                  Select Playlist
                </button>
              </li>
              {playlists.map((playlist) => {
                return (
                  <li key={playlist.id}>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => {
                        setSelectedPlaylist(playlist);
                      }}
                    >
                      {playlist.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <a
          className="btn btn-success btn-lg"
          href={process.env.REACT_APP_AUTH_URL}
        >
          Login With Spotify
        </a>
      )}
    </>
  );
}
