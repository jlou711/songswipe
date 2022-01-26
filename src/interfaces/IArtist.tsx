export interface IArtist {
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
