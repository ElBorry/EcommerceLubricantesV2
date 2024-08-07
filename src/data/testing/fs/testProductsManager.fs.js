import productsManager from "../../fs/ProductsManager.fs.js";

const testProductsManager = async () => {
    console.log("Data from file:");
    let fileTotal = await productsManager.read();
    console.log(fileTotal);

    console.log("Creation of the products");
    for (let i = 0; i < 41; i++) {
        await productsManager.create({
            title: `Product ${i}`,
            photo: `https://example.com/photo${i}.jpg`,
            category: `Category ${i % 2 === 0 ? "A" : "B"}`,
            price: 100 * (i + 1),
            stock: 100,
        });
    }

    console.log("Data from file:");
    fileTotal = await productsManager.read();
    console.log(fileTotal);
    console.log(
        "Search a product by id,in this case, the product of position 3 will be extracted from the read method."
    );
    console.log("Producto found:", await productsManager.readOne(fileTotal[2].id));
    console.log(
        "Delete a product by id,in this case, the product of position 5 will be extracted from the read method."
    );
    const remaining_products = await productsManager.destroy(fileTotal[4].id);
    console.log("Remaining products:", remaining_products);

    //Expected errors
    console.log(
        "Search for a product by an ID that does not exist, in this case 2025"
    );
    console.log(await productsManager.readOne(2025));
    console.log(
        "Destroy a product by an ID that does not exist, in this case 2025"
    );
    console.log(await productsManager.destroy(2025));
}

testProductsManager()