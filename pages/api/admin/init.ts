import {NextApiRequest, NextApiResponse} from 'next';
import {initDB} from '../../lib/db/init';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (initDB()) {
        res.status(200).json({message: "success"});
    } else {
        res.status(500).json({error: "Failed to insert all lockers"});
    }
}