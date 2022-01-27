import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import NavBar from "./NavBar";

it("renders without crashing", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
});

const links = [
  { text: "Home", location: "/" },
  { text: "Add Song", location: "add-song" },
  { text: "Popular 🔥", location: "popular" },
];

it("title should display app name and also link back to home page", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
  const title = screen.getByText("SongSwipe");
  expect(title).toHaveTextContent("SongSwipe");
  expect(title).toHaveAttribute("href", "/");
});

// I use test.each to iterate the test cases above
test.each(links)("Check if Nav Bar have %s link.", (link) => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
  //Ensure the text is in the dom, will throw error it can't find
  const linkDom = screen.getByText(link.text);

  //use jest assertion to verify the link property
  expect(linkDom).toHaveAttribute("href", link.location);
});
