import Student from '../models/Student';
import dbConnect from '../lib/db';

export default async function handler(req, res) {
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