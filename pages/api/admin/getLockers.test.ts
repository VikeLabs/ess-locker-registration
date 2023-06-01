import { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../../lib/db/init";
import handler from "./getLockers";
import { ECS_ID, ELW_ID } from "../../../lib/locker_constants";


const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
} as unknown as jest.Mocked<NextApiResponse>;

initDB();

describe("Testing getLockers handler", () => {
    it("Returns HTTP 200 when it retrieves all lockers lockers in the database", () => {
        const req = {
            method: "GET",
            query: {}
        } as unknown as NextApiRequest;

        handler(req, mockedRes)

        expect(mockedRes.status).toHaveBeenCalledWith(200)
    });

    it("Returns 838 lockers in the database", () => {
        const req = {
            method: "GET",
            query: {}
        } as unknown as NextApiRequest;

        handler(req, mockedRes)

        expect(mockedJson.mock.calls[1][0]).toHaveLength(838)
    });


})