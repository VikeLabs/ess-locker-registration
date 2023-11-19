import {NextApiRequest, NextApiResponse} from 'next';
import { deregisterAll } from '../../../lib/api/admin/admin';


export default function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const deregistered_count = deregisterAll()

    return res.status(200).json(deregistered_count);

}

