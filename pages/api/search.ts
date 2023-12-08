import { NextApiRequest, NextApiResponse } from "next";
import { search } from "../../lib/api/users/user";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const building = parseInt(req.body.building as string);
    const number = parseInt(req.body.number as string);

    if (isNaN(building) || isNaN(number)) {
        return res.status(400).json({ message: "Invalid query" });
    }

    const registrationInfo = search(building, number);

    if (!registrationInfo) {
        return res.status(404).json({ message: "Locker not found" });
    }

    return res.status(200).json(registrationInfo);
}
