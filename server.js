import express from 'express';
import productRoute from './routes/product.routes.js';
import userRoute from './routes/user.routes.js'

const app = express();

// Use express middleware to parse JSON requests (for PUT, POST)
app.use(express.json());
//urlencoded
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.get('/', async (req, res) => {
    try {
        res.send("Hello and welcome to the rate limit service!");
    } catch (error) {
        console.error('Error on homepage:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


export default app;