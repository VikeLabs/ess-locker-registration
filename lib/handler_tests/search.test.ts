import { initDB } from "../db/init";
import { ECS_ID, ELW_ID } from "../locker_constants";
import { register } from "../api/users/user";
import handler from "../../pages/api/search";
import { NextApiRequest, NextApiResponse } from "next";

const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
} as unknown as jest.Mocked<NextApiResponse>;

initDB();

describe("Testing search handler with a registered locker", () => {

    it("Returns HTTP 200 when the locker exists", async () => {
        const req = {
            method: "GET",
            query: {
                building: ECS_ID,
                number: 101
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenCalledWith(200);
    });

    it("Returns registration information when the locker is registered", async () => {
        register(ECS_ID, 101, "John Doe", "johndoe@uvic.ca", false);
        const req = {
            method: "GET",
            query: {
                building: ECS_ID,
                number: 101
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenCalledWith({ available: false, building_id: ECS_ID, num: 101, reported_at: null });
    });

    it("Returns registration information when the locker is not registered", async () => {
        const req = {
            method: "GET",
            query: {
                building: ELW_ID,
                number: 201
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenCalledWith({ available: true, building_id: ELW_ID, num: 201, reported_at: null });
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

        expect(mockedRes.status).toHaveBeenCalledWith(404);
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

        expect(mockedRes.status).toHaveBeenCalledWith(404);
    });
});