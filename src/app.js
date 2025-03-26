const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", require("./routes/auth"));
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando!");
});
app.use("/product-order", require("./routes/products"))
module.exports=app