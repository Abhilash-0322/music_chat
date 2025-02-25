import {Song} from '../models/song.model.js';
import {Album} from '../models/album.model.js';
import {User} from '../models/user.model.js';

export const getStats=async (req, res,next) => {

    try{
        // const totalSongs= await Song.countDocuments();
        // const totalUsers= await User.countDocuments();
        // const totalAlbums= await Album.countDocuments();
        const [totalSongs,totalUsers,totalAlbums,uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            Song.aggregate([
                {
                    $unionWith:{
                        coll:"albums",
                        pipeline:[]
                    },
                },
                {
                    $count:"count"
                }
            ])
        ]);
        res.json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists:uniqueArtists[0]?.count || 0
        });
    }
    catch(err){
        next(err);}
}