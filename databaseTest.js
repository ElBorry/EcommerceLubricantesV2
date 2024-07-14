import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Conectar a MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

// Función para probar las operaciones CRUD
const testDatabaseOperations = async () => {
    try {
        // Conectar a la base de datos
        await connectToDatabase();

        // Obtener la referencia a la base de datos
        const db = mongoose.connection.db;

        // Obtener las colecciones
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections);

        // Operaciones de prueba en la colección 'products'
        const productsCollection = db.collection('products');

        // Crear un nuevo producto
        const newProduct = {
            title: "Nuevo Producto",
            photo: "foto_default.jpg",
            category: "categoría de prueba",
            price: 100,
            stock: 10
        };
        const insertResult = await productsCollection.insertOne(newProduct);
        console.log('Insert result:', insertResult);

        // Leer un producto
        const product = await productsCollection.findOne({ _id: insertResult.insertedId });
        console.log('Product:', product);

        // Actualizar un producto
        const updateResult = await productsCollection.updateOne(
            { _id: insertResult.insertedId },
            { $set: { price: 150 } }
        );
        console.log('Update result:', updateResult);

        // Eliminar un producto
        const deleteResult = await productsCollection.deleteOne({ _id: insertResult.insertedId });
        console.log('Delete result:', deleteResult);
    } catch (err) {
        console.error('Error during database operations:', err);
    } finally {
        // Cerrar la conexión a la base de datos
        mongoose.connection.close();
    }
};

// Ejecutar las operaciones de prueba
testDatabaseOperations();
