const mongoose = require('mongoose');
const fs = require('fs');
const csvParser = require('csv-parser');
const  Product = require('./product');
const  Sale  = require('./sale');

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Parse Products CSV and Insert into Database
async function insertProducts() {
    const products = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream('./products.csv')
            .pipe(csvParser())
            .on('data', (row) => {
                const price = parseFloat(row.Price);
                if (isNaN(price)) {
                    console.error(`Invalid price for product: ${row.ProductName}`);
                    return;
                }
                if (!row.ProductName || !row.Category) {
                    console.error(`Missing required fields (name/category) for product: ${row.ProductName}`);
                    return; 
                }

                products.push({
                    productId: row.ProductID,
                    name: row.ProductName,
                    category: row.Category,
                    price: price,
                });
            })
            .on('end', async () => {
                if (products.length > 0) {
                    try {
                        const insertedProducts = await Product.insertMany(products);
                        resolve(insertedProducts);
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error("No valid products to insert"));
                }
            })
            .on('error', reject);
    });
}

// Parse Sales CSV and Insert into Database
async function insertSales(products) {
    return new Promise((resolve, reject) => {
        const sales = [];
        fs.createReadStream('./sales.csv')
            .pipe(csvParser())
            .on('data', (row) => {
                
                const product = products.find(
                    (p) => p.productId === +row.ProductID
                );
                if (product) {
                    sales.push({
                        product: product._id,
                        quantity: parseInt(row.Quantity),
                        date: new Date(row.Date),
                        total: parseFloat(row.TotalAmount),
                    });
                }
            })
            .on('end', async () => {
                await Sale.insertMany(sales);
                resolve(sales);
            })
            .on('error', reject);
    });
}

// Main Function to Populate Database
async function main() {
    try {
        const products = await insertProducts();
        console.log('Products inserted:', products.length);

        const sales = await insertSales(products);
        console.log('Sales inserted:', sales.length);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        mongoose.connection.close();
    }
}

main();
