import { clerkClient } from "@clerk/express";


export const protectedRoute = async(req,res,next) => {
    if(!req.auth.userId){
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
}

export const requireAdmin=async(req,res,next)=>{
    try{
        const currntUser = await clerkClient.getUser(req.auth.userId);
        console.log(currntUser.PrimaryEmailAddress?.emailAddress);
        const isAdmin = process.env.ADMIN_EMAIL===currntUser.PrimaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(403).json({message: 'Unauthorized- You must be an Admin'});
            // return;
        }
        
        next();
    }
    catch(err){
        next(err);
    }  
}