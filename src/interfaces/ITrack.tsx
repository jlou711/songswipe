export interface ITrack {
  name: string;
  artists: Array<IArtist>;
  uri: string;
  album?: string;
  album_art: string;
  release_date: string;
  popularity: number;
}

export interface IArtist {
  name: string;
  uri: string;
}
