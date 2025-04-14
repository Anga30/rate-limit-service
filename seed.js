import ManageConnection from "./ManageConnection.js";
import Product from "./models/product.model.js";
import { faker } from "@faker-js/faker";

const dbManager = new ManageConnection();

try{
    await dbManager.connect_mongodb();
    console.log("Connected to mongo db for seeding...");

    //clear existing data
    await Product.deleteMany({});
    console.log("Existing products removed");

    // Generate products
    let products = [];

    for(let i = 0; i < 1000; i++){
        products.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            quantity: faker.number.int({ min: 1, max: 100 }),
            price: faker.commerce.price({ min: 5, max: 500, dec: 2 }),
            category: faker.commerce.department(),
            sku: faker.string.uuid(),
            image: faker.image.urlLoremFlickr({ category: "products" })
        });
    }
    // Insert into MongoDB
    await Product.insertMany(products);
    console.log("Successfully seeded 1,000 products!");
}catch(error){
    console.error("Seeding Failed:", error);
}finally{
    // Close MongoDB connection
    dbManager.close_mongodb();
}




