// const Course = require('../models/Course');
import Course from '../models/Course'
import dbConnect from '../lib/db';
export default async function handler(req, res) {

    if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

   // Main response headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if(!req.method==='GET') res.status(400).json({error: 'Method Not allowed'})

    try {
         await dbConnect()
        const courses = await Course.find({})
        if(!courses) res.status(501).json({error: 'No Course on the database'})
        res.status(200).json({success: courses})
    } catch (error) {
        res.status(500).json({error: error})
    }
}