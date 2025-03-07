import productsManager from "../../memory/ProductsManager.memory.js";

console.log("Creation of the products");
for (let i = 0; i < 11; i++) {
    productsManager.create({
        title: `Product ${i}`,
        photo: `https://example.com/photo${i}.jpg`,
        category: `Category ${i % 2 === 0 ? "A" : "B"}`,
        price: 100 * (i + 1),
        stock: 100 * (i + 20),
    });
}

console.log("Show all products");
let allProducts = productsManager.read();
console.log(allProducts);
console.log("Fin a product by ID");
console.log("Found:!!!", productsManager.readOne(allProducts[0].id));
console.log("Updating a product by ID");
console.log(productsManager.update(allProducts[0].id, { price: 1 }))
console.log("Deleting a product by ID");
productsManager.destroy(allProducts[0].id);
console.log("Show all products");
allProducts = productsManager.read();
console.log(allProducts);

console.log("Creating a new product 11 without stock parameter");
console.log(
    "An error is expected since a product will be created without the Stock parameter"
);
productsManager.create({
    title: "iPhone 11 Pro",
    photo:
        "https://images.unsplash.com/photo-1589111416000-2000000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    category: "mobile",
    price: 1000,
    // stock: 50,
});

//Show all products
console.log(productsManager.read());

