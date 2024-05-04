import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.post("/login", () => {
    return HttpResponse.json({
      message: "Success",
    });
  }),
  http.post("/signup", () => {
    return HttpResponse.json({
      message: "Success",
    });
  }),
];

export const server = setupServer(...handlers);
