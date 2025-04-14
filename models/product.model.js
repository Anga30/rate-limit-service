import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the name of the product"]
        },
        description: {
            type: String,
            default: "No description available"
        },
        quantity: {
            type: Number,
            required: [true, "Please enter the number of products"],
            default: 0
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            default: 0
        },
        category: { 
            type: String,
            required: [true, "Please enter the category"]
        },
        sku: {
            type: String,
            required: [true, "Enter SKU"],
            unique: true
        },
        image: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
