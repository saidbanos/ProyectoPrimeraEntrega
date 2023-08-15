import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const productManager = new ProductManager("productos.json");

router.use((req, res, next) => {
	console.log("INFO: Running from products.js");
	next();
});

router.get("/", async (req, res) => {
	try {
		const { limit } = req.query;
		let products = await productManager.getProducts();

		if (limit && !isNaN(limit) && limit > 0) {
			products = products.slice(0, Number(limit));
		}

		res.send(products);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error getting products from the file.");
	}
});

router.get("/:pid", async (req, res) => {
	try {
		const pid = Number(req.params.pid);
		const product = await productManager.getProductById(pid);

		if (Object.keys(product).length > 0) {
			res.send(product);
		} else {
			res.status(404).send(`The product with id: ${pid} was not found.`);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Error getting products from the file.");
	}
});

router.post("/", async (req, res) => {
	try {
		const product = req.body;
		const result = await productManager.addProduct(
			product.title,
			product.description,
			product.price,
			product.thumbnails,
			product.code,
			product.stock,
			product.category
		);

		if (typeof result === "string") {
			res.status(400).send({ status: "error", message: result });
		} else {
			res.send({ status: "success" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

router.put("/:pid", async (req, res) => {
	try {
		const pid = Number(req.params.pid);
		const productUpdate = req.body;

		const result = await productManager.updateProduct(pid, productUpdate);

		res.status(result.status === "success" ? 200 : 400).send(result);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

router.delete("/:pid", async (req, res) => {
	try {
		const pid = Number(req.params.pid);
		const result = await productManager.deleteProduct(pid);

		if (result.status === "success") {
			res.status(200).send(result);
		} else {
			res.status(404).send(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

export default router;
