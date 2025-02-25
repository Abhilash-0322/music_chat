import {Song} from '../models/song.model.js';
import { Album } from "../models/album.model.js";
import cloudinary from '../lib/cloudinary.js';

//helper function to upload files to cloudinary
const uploadToCloudinary=async (file) => {
    try{
        const result=await cloudinary.uploader.upload(file.tempFilePath,{
                resource_type: 'auto',
            }
        );
        return result.secure_url; 
    }
    catch(error){
        console.log("Error in uploading to Cloudinary",error);
        throw new Error("Error in uploading to Cloudinary");
    }
}

export const getAdmin=(req, res) => {
    res.send('Admin route');
}

export const createSong= async (req, res,next) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message:"Please upload audio and image files"});
        }
        
        const {title,artist,albumId,duration}=req.body;
        const audioFile=req.files.audioFile;
        const imageFile=req.files.imageFile;

        const audioUrl=await uploadToCloudinary(audioFile);
        const imageUrl=await uploadToCloudinary(imageFile);

        const song=new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId:albumId || null
        })

        await song.save();
        if (albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id}
            })
        res.status(201).json(song);
        }
    }
    catch(error){
        console.log("Error in Creating Song",error);
        res.status(500).json({message:"Internal server error",error});
        next(error);
    }
}

export const deleteSong= async (req, res,next) => {
    try{
        const {id}=req.params;
        
        const song=await Song.findById(id);
        // if(!song){
        //     return res.status(404).json({message:"Song not found"});
        // }
        if(songs.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id}
            })
        }
        await song.filterByIdAndDelete(id);
        res.status(200).json({message:"Song deleted successfully"});

    }
    catch{
        console.log("Error in deleting Song",error);
        next(error);
    }
}

export const createAlbum= async (req, res,next) => {
    try{
        const {title,artist,releaseYear}=req.body;
        const {imageFile}=req.files;

        const imageUrl=await uploadToCloudinary(imageFile);

        const album=new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        });

        await album.save();
        res.status(201).json(album);
    }
    catch(error){
        console.log("Error in creating Album",error);
        next(error);
    }
};

export const deleteAlbum= async (req, res,next) => {
    try{
        const {id}=req.params;
        await Song.deleteMany({albumId:id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:"Album deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting Album",error);
        next(error);
    }
}

export const checkAdmin=(req, res, next) => {
    res.status(200).json({admin:true});
}