import App from "./App";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", () => {
  render(
    <Router>
      <App />
    </Router>
  );
});
