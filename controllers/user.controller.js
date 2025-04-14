import dotenv from 'dotenv';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

//login
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user == null){
        res.status(400).send("User not found");
    }

    try{
        const isAuthenticated = await bcrypt.compare(req.body.password, user.password);
        if (!isAuthenticated) {
            res.status(401).send("User not allowed, please check your password");
        }
        const payload = { id: user._id, email: user.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({accessToken: accessToken});
    }catch{
        res.status(500).json({message: "Internal server error"});
    }
 }

//Get users
const getUsers = async (req, res) => {
    console.log(req.user);
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){
        console.error("Error fetching products:", error);
    res.status(500).send({ message: error.message });
    }
}

//get user
const getUser = async (req, res) => {
    try{
        const { id } = req.params
        const user = await User.findById(id);

        if(!user){
            return res.status(404).send({ message: "user not found" });
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).send({message: "Error fetching user"})
    }
}

//Update user
const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true, // Ensures the data follows schema validation rules
        });
    
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).json(user);
    }catch(error){
        console.error("Error updating user:", error);
        res.status(500).send({ message: error.message });
    }
}

//Create a user
const createUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const newUser = await User.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: "User successfully created",
            user: { email: newUser.email, id: newUser._id }
        });
    }catch (error){
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Delete user
const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if(!user){
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(204).send();
    }catch(error){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default { loginUser, getUsers, getUser, updateUser, createUser, deleteUser };