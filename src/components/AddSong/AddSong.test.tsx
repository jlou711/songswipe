import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import AddSong from "./AddSong";

it("renders without crashing", () => {
  render(
    <Router>
      <AddSong />
    </Router>
  );
});

it("text to should link to spotify forum", () => {
  render(
    <Router>
      <AddSong />
    </Router>
  );
  expect(screen.getByText("song URI")).toHaveAttribute(
    "href",
    "https://community.spotify.com/t5/FAQs/What-s-a-Spotify-URI/ta-p/919201#:~:text=A%20Spotify%20URI%20(Uniform%20Resource,or%20Artist%20Profile%20on%20Spotify."
  );
});

const entries = [
  { uri: "" },
  { uri: "ABCDEFG" },
  { uri: "spotify:track:37ZJ0p5Jm13JPevGcx4SkF" },
  { uri: "spotify:track:37ZJ0p5Jm13JPevGcx4SkF12345" },
];

test.each(entries)(
  "check invalid search inputs display error message and valid inputs do not show error",
  async (entry) => {
    render(
      <Router>
        <AddSong />
      </Router>
    );
    const searchInput = screen.getByPlaceholderText("Enter a song URI..");
    const searchButton = screen.getByText("Search");
    fireEvent.change(searchInput, { target: { value: entry.uri } });
    fireEvent.click(searchButton);

    const songURI = entry.uri.split(":").pop() ?? "";
    if (songURI.length === 22) {
      expect(
        await screen.queryByText("Your URI doesn't look quite right..")
      ).not.toBeInTheDocument();
    } else {
      expect(
        await screen.queryByText("Your URI doesn't look quite right..")
      ).toBeInTheDocument();
    }
  }
);
