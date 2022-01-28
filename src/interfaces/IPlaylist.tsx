export interface IPlaylist {
  id: string;
  name: string;
  owner: {
    display_name: string;
  };
  uri: string;
}
