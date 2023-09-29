import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "../../../lib/api/admin/admin"; 

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({message: "Method not allowed"})
    }

    const building = parseInt(req.query.building as string);
    const number = parseInt(req.query.number as string);

    if (isNaN(building) || isNaN(number)) {
        return res.status(400).json({ message: "Invalid query" });
    }

    const resolution= resolve(building, number);

    if (!resolution) {
        return res.status(404).json({ message: "Unable to resolve locker because it doesn't exist or it has not been reported" });
    }

    return res.status(200).json(resolution);
}
