import { NextApiRequest, NextApiResponse } from "next";
import { register } from "../../../../../VikeLabs/ess-locker-registration/lib/api/users/user"; 
import { stripHtml } from "string-strip-html";


const isValidName = (name) => {
    const re = /^[a-z ,'-]+$/i;
    return re.test(name);
};

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"})
    }

    const building = parseInt(req.query.building as string);
    const number = parseInt(req.query.number as string);
    const name = req.query.name as string;
    const email = req.query.email as string;
    const restrict_email = req.query.restrict_email as unknown as boolean;

    if (isNaN(building) || isNaN(number) || !isValidName(name)) {
        return res.status(400).json({ message: "Invalid query" });
    }

    const registration = register(building, number, name, email, restrict_email);

    if (!registration) {
        return res.status(404).json({ message: "Unable to register locker because it doesn't exist or it has already been registered" });
    }

    return res.status(201).json(registration);
}
