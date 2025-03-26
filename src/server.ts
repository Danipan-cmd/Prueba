import app from "./app";
import http from "http";

const PORT: number = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
