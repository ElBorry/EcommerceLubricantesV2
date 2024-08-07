import cartsManager from "../../memory/CartsManager.memory.js";

const testCartsManager = () => {
    console.log("Creating a cart item");
    const newCartItemData = {
        user_id: "123",
        product_id: "456",
        quantity: 2,
    };
    cartsManager.create(newCartItemData);
    console.log("Cart Item added:", newCartItemData);

    console.log("Data from file:");
    let fileTotal = cartsManager.read();
    console.log(fileTotal);

    console.log(
        "Search a cart item by id,in this case, the first cart item will be extracted from the read method."
    );
    console.log("Cart item found:", cartsManager.readOne(fileTotal[0].id));

    console.log("Updating a cart item by id,in this case, the first cart item will be updated.");
    const updatedCartItemData = {
        quantity: 5,
    };
    const updatedCartItem = cartsManager.update(fileTotal[0].id, updatedCartItemData);
    console.log("Updated cart item:", updatedCartItem);

    console.log("Deleting a cart item by id,in this case, the first cart item will be deleted.");
    cartsManager.destroy(fileTotal[0].id);

    //Expected errors
    console.log("Search for a cart item by an ID that does not exist, in this case 2025");
    console.log(cartsManager.readOne(2025));

    console.log("Deleting a cart item by an ID that does not exist, in this case 2025");
    console.log(cartsManager.destroy(2025));
};

testCartsManager();