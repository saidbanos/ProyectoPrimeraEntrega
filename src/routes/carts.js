import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";

const router = Router();

const cartManager = new CartManager("carrito.json");
const productManager = new ProductManager("productos.json");

router.use((req, res, next) => {
	console.log("INFO: Running from carts.js");
	next();
});

router.post("/", async (req, res) => {
	try {
		const newCart = await cartManager.addCart();
		res.status(201).send(newCart);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

router.get("/:cid", async (req, res) => {
	try {
		const cid = Number(req.params.cid);
		const cart = await cartManager.getCartById(cid);
		if (cart) {
			res.send(cart);
		} else {
			res.status(404).send(`Cart with id ${cid} not found`);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

router.post("/:cid/product/:pid", async (req, res) => {
	try {
		const cid = Number(req.params.cid);
		const pid = Number(req.params.pid);

		const product = await productManager.getProductById(pid);

		if (!product) {
			return res.status(404).send(`Product with id ${pid} not found`);
		}

		const result = await cartManager.addProductToCart(cid, pid);
		res.status(result.status === "success" ? 200 : 400).send(result);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

export default router;
