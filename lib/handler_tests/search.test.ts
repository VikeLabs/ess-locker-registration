import { initDB } from "../db/init";
import { ECS_ID, ELW_ID } from "../locker_constants";
import { register, report } from "../api/users/user";
import handler from "../../pages/api/search";
import { NextApiRequest, NextApiResponse } from "next";

const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
    redirect: jest.fn(),
} as unknown as jest.Mocked<NextApiResponse>;


describe("Search handler", () => {

    beforeEach(() => {
        initDB();
        jest.clearAllMocks();
    });

    it("Responds with HTTP 200 when the locker exists", async () => {
        const lockerNum = 101;
        const req = {
            method: "POST",
            body: {
                building: ECS_ID,
                number: lockerNum
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(200);
    });

    it("Responds with registration information when the locker is registered", async () => {
        const lockerNum = 101;
        register(ECS_ID, lockerNum, "John Doe", "johndoe@uvic.ca", false);
        const req = {
            method: "POST",
            body: {
                building: ECS_ID,
                number: lockerNum
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenLastCalledWith({ available: false, building_id: ECS_ID, num: 101, reported_at: null });
    });

    it("Responds with registration information when the locker is not registered", async () => {
        const lockerNum = 101;
        const req = {
            method: "POST",
            body: {
                building: ECS_ID,
                number: lockerNum
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenLastCalledWith({ available: true, building_id: ECS_ID, num: lockerNum, reported_at: null });
    });

    it("Responds with HTTP 404 when the locker does not exist", async () => {
        const req = {
            method: "POST",
            body: {
                building: ELW_ID,
                number: 1000
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(404);
    });

    it("Responds with HTTP 400 when the query is invalid", async () => {
        const req = {
            method: "POST",
            body: {
                building: "hello",
                number: "world"
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(400);
    });
});