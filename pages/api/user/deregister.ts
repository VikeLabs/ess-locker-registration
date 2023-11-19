import { NextApiRequest, NextApiResponse } from "next";
import { deregister } from "../../../../../VikeLabs/ess-locker-registration/lib/api/users/user"; 

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"})
    }

    const building = parseInt(req.query.building as string);
    const number = parseInt(req.query.number as string);
    const name = req.query.name as string;
    const email = req.query.email as string;

    if (isNaN(building) || isNaN(number) ) {
        return res.status(400).json({ message: "Invalid query" });
    }

    const deregistration = deregister(building, number, name, email);

    if (!deregistration) {
        return res.status(404).json({ message: "Unable to deregister locker because it doesn't exist or it hasn't been registered" });
    }

    return res.status(200).json(deregistration);
}