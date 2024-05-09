// Third party
import cors from "cors";
import debug from "debug";
import express from "express";
import main from "./mongoConfig.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import { WebSocketServer } from "ws";
import { createProxyMiddleware } from "http-proxy-middleware";
// Custom code
import { setupLocalStrategy } from "./utility/authentication/passport.js";
// Routers
import apiRouter from "./routes/api.js";

// Entry point setup
const logger = debug("wheres-waldo:app");
const app = express();
const port = process.env.PORT || 3000;
const webSocketPort = process.env.WEBSOCKET_PORT || 8080;
// WebSocket setup
const wss = new WebSocketServer({ port: webSocketPort });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("open", () => {
    console.log("connected");
    ws.send(Date.now());
  });

  ws.on("close", () => {
    console.log("disconnected");
  });

  ws.on("message", (data) => {
    console.log("received: %s", data);
  });

  ws.send("send some message back");
});

// App setup
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

main().catch((err) => {
  logger(err);
});

// Non-route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Authentication
setupLocalStrategy();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes (default)
    }),
  })
);
app.use(passport.session());

// Routes
app.use("/api", apiRouter);

// For debugging purposes
// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

// Proxy for initial GET request to Express server for React app
app.use(
  "/",
  createProxyMiddleware({
    target: process.env.PROXY_URL,
    changeOrigin: true,
  })
);
