import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "./errorController.js";
import jwt from "jsonwebtoken";


/***
 * @access public
 * @route api/user
 * @method GET
 */
export const getAllUser = async (req, res, next) =>{
    try{
        const user = await User.find();
        if(!user){
            return next(createError(404, "Data Not Found"));
        }
        
        if(user){
            res.status(200).json(user);
        }
    }catch(error){
        next(error)
    }
}

/****
 * @access public
 * @route api/user/:id
 * @mothod GET
 */
export const getSingleUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return next(createError(404, "Single Data Not Found"));
        }

        if(user){
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
}

/****
 * @access public
 * @route api/user/
 * @method POST
 */
export const createUser = async (req, res, next) => {
    // make hass password
    const salt = await bcrypt.genSalt(10);
    const hass_pass = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await User.create({ ...req.body, password: hass_pass });
      res.status(200).json(user);  
    } catch (error) {
        next(error);
    }
}

/**
 * @access public
 * @route /api/user/:id
 * @method PUT/PATCH
 */
 export const updateUser = async (req, res, next) =>{
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(user);
     } catch (error) {
        next(error);
     }
}

/**
 * @access public
 * @route /api/user/:id
 * @method DELETE
 */ 
 export const deleteUser = async (req, res, next) =>{
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
     } catch (error) {
        next(error);
     }
}

/****
 * @access public
 * @route api/user/login
 * @method POST
 */
 export const userLogin = async (req, res, next) => {
    
    try {
        //find user
        const login_user = await User.findOne({email: req.body.email});

        //check user exist or not
        if(!login_user){
            return next(createError(404, "User Not Found"));
        }
        // password check
        const password_check = await bcrypt.compare(req.body.password, login_user.password);

        // password handle
        if(!password_check){
            return next(createError(404, "Wrong Password"));
        }

        // create a token
        const token = jwt.sign({ id: login_user._id, isAdmin: login_user.isAdmin }, process.env.JWT_SECRET );

        // login user info
        const { password, isAdmin, ...login_info } = login_user._doc;

        res.cookie("access_token", token).status(200).json({
            token : token,
            user : login_info,
        });

    } catch (error) {
        next(error);
    }
}

/****
 * @access public
 * @route api/user/register
 * @method POST
 */
 export const userRegister = async (req, res, next) => {
    // make hass password
    const salt = await bcrypt.genSalt(10);
    const hass_pass = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await User.create({ ...req.body, password: hass_pass });
      res.status(200).json(user);  
    } catch (error) {
        next(error);
    }
}