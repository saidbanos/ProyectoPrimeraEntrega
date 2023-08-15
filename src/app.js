import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	console.log("INFO: Running from app.js");
	next();
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send("Something went wrong on app.js");
});

const port = 8080;

app.listen(port, () => {
	console.log(`Server active on port: ${port}`);
});
