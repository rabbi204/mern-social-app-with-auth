import express from "express";
import { createUser, getAllUser, getSingleUser, updateUser, deleteUser, userLogin, userRegister } from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";



//initialize router
const router = express.Router();

// route REST API
router.route('/').get(adminMiddleware, getAllUser).post(adminMiddleware, createUser);
router.route('/:id').get(userMiddleware, getSingleUser).put(userMiddleware, updateUser).patch(userMiddleware, updateUser).delete(userMiddleware, deleteUser);

//user auth Route
router.post('/login', userLogin);
router.post('/register', userRegister);

// export default router
export default router;