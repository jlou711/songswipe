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
export interface IArtistSpotify {
  external_urls: { string: string };
  followers: {};
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<{}>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface IArtistDB {
  artist_name: string;
  artist_uri: string;
  genres: Array<string>;
}
