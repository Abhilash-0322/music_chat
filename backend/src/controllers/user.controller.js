import {User} from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try{
        const currntUserId=req.auth.userId;
        // console.log(currntUser);
        const users = await User.find({clerkId:{$ne:currntUserId}});
        res.status(200).json(users);
    }
    catch(error){
        next(error);
    }
}