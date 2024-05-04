import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.post("/login", () => {
    return HttpResponse.json({
      username: "username",
      password: "password",
    });
  }),
  http.post("/signup", () => {
    return HttpResponse.json({
      username: "username",
      password: "password",
    });
  }),
];

export const server = setupServer(...handlers);
