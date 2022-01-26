export interface IArtist {
  external_urls: { string: string };
  followers: { href: string; total: number };
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
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
