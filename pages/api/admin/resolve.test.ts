import { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../../lib/db/init";
import handler from "./resolve";
import { register, report } from "../../../lib/api/users/user";
import { ECS_ID, ELW_ID } from "../../../lib/locker_constants";

const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
} as unknown as jest.Mocked<NextApiResponse>;

initDB();


describe("Testing resolve handler", () => {

    it("Returns HTTP 200 when the locker is resolved successfully", async () => {
        const req = {
            method: "GET",
            query: {
                building: ECS_ID,
                number: 200
            },
        } as unknown as NextApiRequest;

        let registrations = register(ECS_ID, 200, "Liam Oak", "loak@example.com", false);
        let reported_val= report(ECS_ID, 200);
        
        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenCalledWith(200);
    });

    it("Returns true when the locker is resolved successfully", async () => {

        let registrations = register(ECS_ID, 250, "Paula Kettle", "pkettle@uvic.ca", false);
        let reported_val= report(ECS_ID, 250);

        const req = {
            method: "GET",
            query: {
                building: ECS_ID,
                number: 250
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenLastCalledWith(true);
    });

    it("Returns an error message when the locker was not reported", async () => {
        const req = {
            method: "GET",
            query: {
                building: ELW_ID,
                number: 100
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenLastCalledWith({ message: "Unable to resolve locker because it doesn't exist or it has not been reported" });
    });

    it("Returns HTTP 404 when the locker does not exist", async () => {
        const req = {
            method: "GET",
            query: {
                building: ELW_ID,
                number: 1000
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(404);
    });

    it("Returns HTTP 400 when the query is invalid", async () => {
        const req = {
            method: "GET",
            query: {
                building: "hello",
                number: "world"
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(400);
    });

})
