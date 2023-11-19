import { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../../../../VikeLabs/ess-locker-registration/lib/db/init";
import handler from "./register";
import { register} from "../../../../../VikeLabs/ess-locker-registration/lib/api/users/user";
import { ECS_ID, ELW_ID } from "../../../../../VikeLabs/ess-locker-registration/lib/locker_constants";

const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
} as unknown as jest.Mocked<NextApiResponse>;

beforeEach(() => {
    initDB();
})

describe("Testing register handler", () => {

    it("Returns HTTP 201 when the locker is registered successfully", async () => {
        const req = {
            method: "POST",
            query: {
                building: ECS_ID,
                number: 200,
                name: "Liam Oak",
                email: "loak@example.com",
                restrict_email: false
            },
        } as unknown as NextApiRequest;

        
        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenCalledWith(201);
    });

    it("Returns true when the locker is registered successfully", async () => {


        const req = {
            method: "POST",
            query: {
                building: ECS_ID,
                number: 250,
                name: "Polly Putin",
                email: "pputin@example.com",
                restrict_email: false
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenLastCalledWith(true);
    });

    it("Returns an error message when the locker has been registered", async () => {
        const req = {
            method: "POST",
            query: {
                building: ELW_ID,
                number: 220,
                name: "Polly Putin",
                email: "pputin@example.com",
                restrict_email: false
            },
        } as unknown as NextApiRequest;

        register(ELW_ID, 220, "Pike Toofle", "ptoofle@example.com", false)

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenLastCalledWith({ message: "Unable to register locker because it doesn't exist or it has already been registered" });
    });

    it("Returns HTTP 404 when the locker does not exist", async () => {
        const req = {
            method: "POST",
            query: {
                building: ELW_ID,
                number: 1000,
                name: "Jake Dog",
                email: "jd@example.com",
                restrict_email: false
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(404);
    });

    it("Returns HTTP 400 when the query is invalid", async () => {
        const req = {
            method: "POST",
            query: {
                building: "hello",
                number: "world",
                name: "!!### Likn!!",
                email: "invalid@example.com",
                restrict_email: false
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(400);
    });

})
