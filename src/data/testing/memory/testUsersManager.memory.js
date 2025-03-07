import usersManager from "../../memory/UsersManager.memory.js";



//Creating a new user 1
usersManager.create({
    photo:
        "https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E",
    email: "admin@example.com",
    password: "123456789",
    role: "1",
});
//Creating a new user 2 with photo path adn role parameter
usersManager.create({
    email: "employee1@example.com",
    password: "carlitos45",
});
//Creating a new user 3
usersManager.create({
    photo:
        "https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E",
    email: "admin2@example.com",
    password: "987654321",
    role: "1",
});
//Creating a new user 4
usersManager.create({
    photo:
        "https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E",
    email: "pedritocuenta@example.com",
    password: "camion2000",
    role: "0",
});

//Creating a new user 5
usersManager.create({
    photo:
        "https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E",
    email: "pedritocuenta2@example.com",
    password: "camion21000",
    role: "0",
});


console.log("Show all users");
let allUsers = usersManager.read();
console.log(allUsers);
console.log("Find a user by ID:");
console.log("Found:!!!", usersManager.readOne(allUsers[0].id));
console.log("Update a user by ID:");
console.log(usersManager.update(allUsers[2].id, {
    password: "Estocolmo"
}))
console.log("Show all users");
allUsers = usersManager.read();
console.log(allUsers);
console.log("Deleting a user by ID:");
usersManager.destroy(allUsers[0].id);
console.log("Show all users");
allUsers = usersManager.read();
console.log(allUsers);

console.log(
    "Test : Creating a new user 6 without email parameter, an error is expected"
);

usersManager.create({
    photo:
        "https://unsplash.com/es/fotos/fotografia-de-enfoque-superficial-de-mujer-al-aire-libre-durante-el-dia-rDEOVtE7vOs",
    // email: 'employee1@example.com',
    password: "estoclastica45",
    role: "0",
});

console.log("Show all users");
console.log(usersManager.read());
