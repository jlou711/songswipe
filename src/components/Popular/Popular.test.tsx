import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Popular from "./Popular";

it("renders without crashing", () => {
  render(
    <Router>
      <Popular />
    </Router>
  );
});

// it("popular/unpopular headings should exist", async () => {
//   act(() => {
//     render(
//       <Router>
//         <Popular />
//       </Router>
//     );
//   });

//   expect(screen.getAllByText("Popular")).toBeInTheDocument;
//   expect(screen.getAllByText("Unpopular")).toBeInTheDocument;
// });
