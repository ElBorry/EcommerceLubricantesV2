import cartsManager from "../../fs/CartsManager.fs.js";

const testCartsManager = async () => {
    console.log("Data from file:");
    let fileTotal = await cartsManager.read();
    console.log(fileTotal);

    console.log("Creating a cart item 1");
    const newCartItemOne = await cartsManager.create({
        user_id: "123",
        product_id: "456",
        quantity: 2,
    });
    console.log("Creating a cart item 2");
    const newCartItemTwo = await cartsManager.create({
        user_id: "75309d7ee7db27302e4a2008",
        product_id: "2250",
        quantity: 10,
        state: "paid"
    });


    console.log("Data from file:");
    fileTotal = await cartsManager.read();
    console.log(fileTotal);

    console.log(
        "Search a cart item by id,in this case, the first cart item will be extracted from the read method."
    );
    console.log("Cart item found:", await cartsManager.readOne(fileTotal[0].id));

    console.log("Updating a cart item by id,in this case, the first cart item will be updated.");
    await cartsManager.update(fileTotal[0].id, {
        quantity: 5,
    });
    console.log(await cartsManager.readOne(fileTotal[0].id));

    console.log("Deleting a cart item by id,in this case, the first cart item will be deleted.");
    await cartsManager.destroy(fileTotal[0].id);


    //Expected errors
    console.log("Search for a cart item by an ID that does not exist, in this case 2025");
    console.log(await cartsManager.readOne(2025));

    console.log("Deleting a cart item by an ID that does not exist, in this case 2025");
    console.log(await cartsManager.destroy(2025));


}

testCartsManager()