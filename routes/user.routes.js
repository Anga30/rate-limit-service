import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controller.js';
import authenticateToken from '../middlewares/authToken.js'
const { loginUser, getUsers, getUser, updateUser, createUser, deleteUser} = userController;

//login
router.post('/login', loginUser);

//Get user
router.get('/:id', authenticateToken, getUser);

//Get users
router.get('/', authenticateToken, getUsers);

//create user
router.post('/', authenticateToken, createUser);

//Update user
router.patch('/:id', authenticateToken, updateUser);

//Delete user
router.delete('/:id', deleteUser);


export default router;



