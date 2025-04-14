import Product from "../models/product.model.js";
const DEFAULT_EXPIRATION = 3600;

const getProducts = async (req, res) => {
  const redisClient = req.app.locals.redis;
  
  try {
    const cacheKey = "products";
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const products = await Product.find({});
    await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: error.message });
  }
};

const createProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(204).send(); // Use 204 to indicate successful deletion with no content
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: error.message });
  }
};

export default {
    getProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct,
  };
