import TinderContainer from "./components/TinderContainer/TinderContainer";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddSong from "./components/AddSong/AddSong";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Popular from "./components/Popular/Popular";
import { useCallback, useEffect, useState, createContext } from "react";
import { IUser } from "./interfaces/IUser";
import axios from "axios";
import { IPlaylist } from "./interfaces/IPlaylist";

export const AppContext = createContext<IUser | undefined>(undefined);
export const PlaylistContext = createContext<IPlaylist[]>([]);
export const SelectedPlaylistContext = createContext<{
  selectedPlaylist: IPlaylist | undefined;
  setSelectedPlaylist: React.Dispatch<
    React.SetStateAction<IPlaylist | undefined>
  >;
}>({
  selectedPlaylist: {
    name: "dulcet women vocals",
    owner: {
      display_name: "Jamie Lou",
    },
    id: "6JN5X5GrV6vORkH3sb95Up",
    uri: "spotify:playlist:6JN5X5GrV6vORkH3sb95Up",
  },
  setSelectedPlaylist: () => {
    /** */
  },
});

function App(): JSX.Element {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [userPlaylists, setUserPlaylists] = useState<IPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<
    IPlaylist | undefined
  >();

  async function getSpotifyDetails(token: string) {
    const resp = await axios(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return resp.data;
  }

  async function getSpotifyPlaylists(token: string) {
    const resp = await axios(
      `https://api.spotify.com/v1/me/playlists?limit=50`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return resp.data.items;
  }

  const getReturnedParamsFromSpotifyAuth = (hash: string) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce(
      (accumulater: { [key: string]: string }, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
      },
      {}
    );

    return paramsSplitUp;
  };

  const getAccessToken = useCallback(async function () {
    if (window.location.hash) {
      const auth_data = getReturnedParamsFromSpotifyAuth(window.location.hash);
      window.history.pushState({}, "", "/");
      const userDetails = await getSpotifyDetails(auth_data.access_token);
      const userPlaylists = await getSpotifyPlaylists(auth_data.access_token);
      setUserPlaylists(
        userPlaylists.map((playlist: IPlaylist) => {
          return {
            name: playlist.name,
            owner: playlist.owner,
            id: playlist.id,
            uri: playlist.uri,
          };
        })
      );
      setUser({
        name: userDetails.display_name,
        token: auth_data.access_token,
        user_uri: userDetails.id,
      });
    }
  }, []);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <AppContext.Provider value={user}>
        <PlaylistContext.Provider value={userPlaylists}>
          <SelectedPlaylistContext.Provider
            value={{
              selectedPlaylist: selectedPlaylist,
              setSelectedPlaylist: setSelectedPlaylist,
            }}
          >
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<TinderContainer />} />
              <Route path="/add-song" element={<AddSong />} />
              <Route path="/popular" element={<Popular />} />
            </Routes>
          </SelectedPlaylistContext.Provider>
        </PlaylistContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
