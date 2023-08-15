# Proyecto Primera Entrega
Servidor basado express donde podemos hacer consultas a nuestro archivo de productos y carrito.

## Pasos a seguir para correr la aplicacion:
- Se instalarán las dependencias a partir del comando "npm install"
- Se echará a andar el servidor con el comando: "node app.js" o bien "nodemon app.js" ("app.js" se encuentra dentro de la carpeta src).
- Los archivos "productos.json" y "carrito.json" ya estan incluidos y "productos.json" ya cuenta con almenos 10 productos.
- Se corroborará que el servidor esté corriendo en el puerto 8080.

## Testing de la aplicacion:
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
- Se podra hacer post a http://localhost:8080/api/carts, esto creara un carrito vacio con un id generado automaticamente.
- Se podra hacer get de http://localhost:8080/api/carts/1692115168535 por ejemplo, donde 1692115168535 seria un ejemplo de un id de carrito ya existente, esto devolvera el carrito esperado con los productos que contenga.
- Se podra hacer post a http://localhost:8080/api/carts/1692115168535/product/5 por ejemplo, donde 1692115168535 seria un ejemplo de un id de carrito ya existente, y 5 el id de un producto ya existente, esto agregara un producto (+1) del product id=5 en el carrito con id=1692115168535.
- En caso de repetir el post anterior, como el producto ya existe en el carrito, se incrementara en +1 dicho producto.
