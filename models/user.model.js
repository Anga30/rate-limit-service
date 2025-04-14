import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,  // Prevent duplicate emails
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;