import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Leaderboard from "./Leaderboard";

const mockResponse = [
  {
    id: 1,
    username: "John Doe",
    score: 120,
  },
  {
    id: 2,
    username: "Jane Doe",
    score: 60,
  },
];

// describe("leaderboard", () => {
//   beforeAll(() => {
//     vi.spyOn(global, "fetch").mockImplementation(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(mockResponse),
//       } as Response)
//     );
//   });

//   afterAll(() => {
//     vi.restoreAllMocks();
//   });

//   it("should show list", async () => {
//     render(<Leaderboard />);

//     expect(screen.getByText(/Loading/i)).toBeInTheDocument();

//     // Wait until fetch is done...
//     await waitFor(() => expect(screen.getByRole("list")).toBeDefined());
//     expect(screen.queryByText(/Loading/i)).toBeNull();
//     expect(screen.getByText("John Doe")).toBeInTheDocument();
//   });
// });
