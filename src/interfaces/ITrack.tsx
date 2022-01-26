import { IArtistDB } from "./IArtist";

export interface ITrack {
  name: string;
  artists: Array<IArtistDB>;
  uri: string;
  album?: string;
  album_art: string;
  release_date: string;
  popularity: number; // To display only, doesn't get stored
}

export interface ITrackDB extends ITrack {
  likes: number;
  dislikes: number;
  genres: Array<string>;
}

export interface IPopularTrack {
  name: string;
  uri: string;
  album?: string;
  album_art: string;
  release_date: string;
  likes: number;
  dislikes: number;
  artists: string;
  genres: string;
  difference: number;
}
