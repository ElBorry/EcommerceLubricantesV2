import { faker } from '@faker-js/faker';
import productsRepository from '../repositories/products.rep.js';
import { dbConnection } from '../utils/mongo/dbConnection.util.js';

const createDataMockProducts=async()=>{
    try {
        dbConnection()
        const iterations=1000;
        for (let i = 1; i <=iterations ; i++) {
            const prefix = faker.helpers.arrayElement(['Galactic', 'Epic', 'Dark', 'Light', 'Mystic', 'Warrior', 'Legend', 'Hero', 'Quest', 'Adventure']);
            const suffix = faker.helpers.arrayElement(['Quest', 'War', 'Rise', 'Fall', 'Battle', 'Saga', 'Chronicles', 'Odyssey', 'Journey', 'Legacy']);
            const adjective = faker.helpers.arrayElement(['Epic', 'Dark', 'Light', 'Mystic', 'Ancient', 'Forgotten', 'Lost', 'Hidden', 'Secret', 'Mysterious']);
            const noun = faker.helpers.arrayElement(['Kingdom', 'Empire', 'World', 'Land', 'Realm', 'Dimension', 'Universe', 'Planet', 'Galaxy', 'Cosmos']);
    
            const newProduct={
                title: `${prefix} ${adjective} ${noun} ${suffix}`,
                photo:faker.image.urlLoremFlickr({ category: 'abstract' }),
                category:faker.helpers.arrayElement(['PS5', 'NINTENDO', 'XBOX']),
                price:faker.number.float({ min: 20, max: 100,fractionDigits: 3 }),
                stock:faker.number.int({ min: 10, max: 50 }),
            }
            console.log(newProduct);
            await productsRepository.createRepository(newProduct) 
        }
        console.log("Creation of the products");
    } catch (error) {
        console.log(error);
    }
}

createDataMockProducts()