import usersManager from "../../fs/UsersManager.fs.js";

const testUsersManager = async () => {
    console.log("Data from file:");
    let fileTotal = await usersManager.read();
    console.log(fileTotal);

    console.log("Creation of the users");
    await usersManager.create({
        photo: "default-image-url",
        email: "user1@example.com",
        password: "<PASSWORD>",
        role: "1",
    });
    await usersManager.create({
        photo: "default-image-url",
        email: "user2@example.com",
        password: "<PASSWORD>",
        role: "0",
    });
    await usersManager.create({
        photo: "default-image-url",
        email: "user3@example.com",
        password: "<PASSWORD>",
        role: "1",
    });
    console.log("User 4 without photo parameter and role parameter");
    await usersManager.create({
        email: "user4@example.com",
        password: "<PASSWORD>",
    });

    await usersManager.create({
        photo: "default-image-url",
        email: "user5@example.com",
        password: "<PASSWORD>",
        role: "0",
    });

    console.log("Data from file:");
    fileTotal = await usersManager.read();
    console.log(fileTotal);

    console.log(
        "Search a user by id,in this case, the product of position 3 will be extracted from the read method."
    );
    console.log("User found:", await usersManager.readOne(fileTotal[2].id));
    console.log(
        "Delete a user by id,in this case, the product of position 4 will be extracted from the read method."
    );
    const remaining_products = await usersManager.destroy(fileTotal[3].id);
    console.log("Remaining users:", remaining_products);

    //Expected errors
    console.log(
        "Search for a user by an ID that does not exist, in this case 2025"
    );
    console.log(await usersManager.readOne(2025));
    console.log("Destroy a user by an ID that does not exist, in this case 2025");
    console.log(await usersManager.destroy(2025));
}

testUsersManager()