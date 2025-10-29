// /api/submit-assessments.js
import mongoose from 'mongoose';

// import Assessment from '../models/Assessment';


const isConnected = false
const uri = process.env.DB_URL;

module.exports = async(req, res)=>{

  if(req.method!=='POST') res.status(400).json({error: 'Method not allowed'})

  try {
    if (!isConnected) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      isConnected = true;
    }

    res.status(200).json({msg:'successful'})
  } catch (error) {
    res.status(500).json({error: error})
  }
}