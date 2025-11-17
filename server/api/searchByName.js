import Student from '../models/Student';
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

    if(!req.method === 'GET') return res.status(400).json({error: 'Method Not allowed'})

        try {
            const {name} = req.params
            await dbConnect()
            const searchResult = await Student.find({ name: { $regex: name, $options: "i" } })
            if(!searchResult) res.status(401).json({msg: 'Student Not found'})
            res.status(200).json({success: searchResult})
        } catch (error) {
            res.status(500).json({error: error})
        }
}