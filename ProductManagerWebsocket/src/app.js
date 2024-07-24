const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const pathView = path.join(`${__dirname}/views`);
const productsRouter = require("./routes/products.router");
const socketIO = require("socket.io");

const http = require("http");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIO(server);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", pathView);

const staticPath = path.join(`${__dirname}/public`);

app.use("/static", express.static(staticPath));

app.use("/products", productsRouter);

const ProductManager = require("./productManagerFS.js");
const pMPath = path.join(`${__dirname}/data/products.json`);
const pM = new ProductManager(pMPath);

let products = [];

io.on("connection", async (socket) => {
  products = await pM.getProducts();
  console.log("Usuário conectado");
  socket.emit("products", products);
  socket.on("new-product", async (data) => {
    data.id = products[products.length - 1].id + 1;
    products.push(data);
    await pM.saveProductsToFile(products);
    socket.broadcast.emit("products", products);
  });
});

module.exports = server;
