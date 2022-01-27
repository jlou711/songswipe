import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import PopularTable from "./PopularTable";
import { capitalize } from "../../utils/capitalize";

const songs = [
  {
    uri: "5GUYJTQap5F3RDQiCOJhrS",
    name: "Self Control",
    album: "Blonde",
    album_art:
      "https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526",
    release_date: "2016-08-20",
    likes: 8,
    dislikes: 1,
    difference: 7,
    artists: "Frank Ocean",
    genres: "alternative r&b, hip hop, lgbtq+ hip hop, neo soul, pop",
  },
  {
    uri: "02MWAaffLxlfxAUY7c5dvx",
    name: "Heat Waves",
    album: "Dreamland (+ Bonus Levels)",
    album_art:
      "https://i.scdn.co/image/ab67616d00001e029e495fb707973f3390850eea",
    release_date: "2020-08-06",
    likes: 8,
    dislikes: 1,
    difference: 7,
    artists: "Glass Animals",
    genres: "gauze pop, indietronica, shiver pop",
  },
  {
    uri: "4ZtFanR9U6ndgddUvNcjcG",
    name: "good 4 u",
    album: "SOUR",
    album_art:
      "https://i.scdn.co/image/ab67616d00001e02a91c10fe9472d9bd89802e5a",
    release_date: "2021-05-21",
    likes: 8,
    dislikes: 1,
    difference: 7,
    artists: "Olivia Rodrigo",
    genres: "pop",
  },
  {
    uri: "3ODFkkLTkyZpdyzcDQXTij",
    name: "3AM",
    album: "3AM",
    album_art:
      "https://i.scdn.co/image/ab67616d00001e02d832b1ac3b9bc49071be0540",
    release_date: "2018-07-12",
    likes: 7,
    dislikes: 3,
    difference: 4,
    artists: "Baauer, AJ Tracey, Jae Stephens",
    genres:
      "bass trap, electro house, electronic trap, escape room, vapor twitch, grime, uk hip hop, ukg revival, alternative r&b",
  },
  {
    uri: "45n7W7WLGntk46zi08LmVz",
    name: "I Bet You Look Good On The Dancefloor",
    album: "Baby Charles",
    album_art:
      "https://i.scdn.co/image/ab67616d00001e02b91a9d0273309b62ad570c7a",
    release_date: "2008-03-17",
    likes: 5,
    dislikes: 2,
    difference: 3,
    artists: "Baby Charles",
    genres: "deep funk",
  },
];

it("renders without crashing", () => {
  render(
    <Router>
      <PopularTable songs={songs} />
    </Router>
  );
});

it("table should contain 6 rows (including header)", () => {
  render(
    <Router>
      <PopularTable songs={songs} />
    </Router>
  );
  const tableRows = screen.queryAllByRole("row");
  expect(tableRows).toHaveLength(6);
});

test("song details should exist in document", () => {
  render(
    <Router>
      <PopularTable songs={songs} />
    </Router>
  );
  const tableRows = screen.queryAllByRole("row");
  for (let i = 1; i < tableRows.length; i++) {
    expect(tableRows[i]).toHaveTextContent(songs[i - 1].name);
    expect(tableRows[i]).toHaveTextContent(songs[i - 1].artists);
    expect(tableRows[i]).toHaveTextContent(
      songs[i - 1].genres
        .split(", ")
        .map((genre) => capitalize(genre))
        .join(", ")
    );
    expect(tableRows[i]).toHaveTextContent(songs[i - 1].difference.toString());
  }
});
