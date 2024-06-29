import Excel from 'exceljs';
import Product from './src/data/mongo/models/product.model.js';

const excelFilePath = './basededatos.xlsx'; // Ajusta la ruta a tu archivo Excel
const workbook = new Excel.Workbook();

async function importData() {
    try {
        await workbook.xlsx.readFile(excelFilePath);

        console.log(`Número total de hojas de cálculo en el archivo: ${workbook.worksheets.length}`);

        const worksheet = workbook.worksheets[0];
        console.log(`Número de filas en la hoja de cálculo: ${worksheet.rowCount}`);

        // Iterar sobre cada fila (ignorando la primera fila de encabezados)
        worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
            // Leer los datos de la fila
            const sku = row.getCell(1).value;
            const title = row.getCell(2).value;
            const photo = row.getCell(3).value;
            const category = row.getCell(4).value;
            const container = row.getCell(5).value;
            const ltsContainer = parseFloat(row.getCell(6).value); // Convertir a número
            const stock = row.getCell(7).value;
            const liters = row.getCell(8).value;

            // Validar que los datos necesarios estén presentes
            if (!sku) {
                console.log(`Fila ${rowNumber}: SKU está vacío o no definido.`);
                return; // Saltar esta fila si SKU está vacío
            }

            // Validar y manejar errores de conversión para ltsContainer
            if (isNaN(ltsContainer)) {
                console.log(`Fila ${rowNumber}: Valor no numérico para ltsContainer.`);
                return; // Saltar esta fila si ltsContainer no es un número
            }

            // Crear un nuevo producto con los datos
            const newProduct = new Product({
                sku,
                title,
                photo,
                category,
                container,
                ltsContainer,
                stock,
                liters,
            });

            // Guardar el producto en la base de datos
            await newProduct.save();
            console.log(`Producto SKU ${sku} importado correctamente.`);
        });

        console.log(`Importación de datos completada`);
    } catch (error) {
        console.error(`Error al validar datos desde el archivo Excel: ${error.message}`);
    }
}

importData();
