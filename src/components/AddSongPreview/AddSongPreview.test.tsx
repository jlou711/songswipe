import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import AddSongPreview from "./AddSongPreview";

const selectedSong = {
  name: "Phone Numbers",
  artists: [
    {
      artist_name: "Dominic Fike",
      artist_uri: "6USv9qhCn6zfxlBQIYJ9qs",
      genres: ["alternative pop rock", "pop"],
    },
    {
      artist_name: "Kenny Beats",
      artist_uri: "1rHOtdmGNr5vcYNw5v7QGC",
      genres: ["trap", "underground hip hop"],
    },
  ],
  uri: "3f9Mzvd3URfbbIJBX4pz9Z",
  album: "Phone Numbers",
  album_art: "https://i.scdn.co/image/ab67616d00001e021047fa3fb0151cf803d9c696",
  release_date: "2019-07-04",
  popularity: 75,
};
const addTrackDetails = jest.fn();

it("renders without crashing", () => {
  render(
    <Router>
      <AddSongPreview song={selectedSong} addTrackDetails={addTrackDetails} />
    </Router>
  );
});

it("text associated to favicon should exist in document", () => {
  render(
    <Router>
      <AddSongPreview song={selectedSong} addTrackDetails={addTrackDetails} />
    </Router>
  );
  expect(
    screen.getByText("Click the tick if this looks right!")
  ).toBeInTheDocument();
});

it("should render song details", () => {
  render(
    <Router>
      <AddSongPreview song={selectedSong} addTrackDetails={addTrackDetails} />
    </Router>
  );
  expect(screen.getByText("Phone Numbers")).toBeInTheDocument();
  expect(screen.getByText("Album: Phone Numbers")).toBeInTheDocument();
  expect(
    screen.getByText("Artists: Dominic Fike, Kenny Beats")
  ).toBeInTheDocument();
  expect(screen.getByText("Release Date: 2019-07-04")).toBeInTheDocument();
  expect(screen.getByText("Popularity: 75")).toBeInTheDocument();
});

it("addTrackDetails to be called when favicon is clicked", () => {
  render(
    <Router>
      <AddSongPreview song={selectedSong} addTrackDetails={addTrackDetails} />
    </Router>
  );

  fireEvent.click(screen.getByTestId("check-button"));
  expect(addTrackDetails).toHaveBeenCalled();
});
