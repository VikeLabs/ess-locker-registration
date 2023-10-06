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

    it("Redirects to register when the locker is available", async () => {
        const lockerNum = 101;
        const req = {
            method: "GET",
            query: {
                building: ECS_ID,
                number: lockerNum
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).not.toHaveBeenCalled();
        expect(mockedRes.redirect).toHaveBeenCalledTimes(1);
        expect(mockedRes.redirect).toHaveBeenCalledWith(200, `/register?building=${ECS_ID}&number=${lockerNum}`);
    });

    it("Redirects to deregister when the locker is not available", async () => {
        const lockerNum = 101;
        register(ECS_ID, lockerNum, "John Doe", "johndoe@uvic.ca", false);
        const req = {
            method: "GET",
            query: {
                building: ECS_ID,
                number: lockerNum
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).not.toHaveBeenCalled();
        expect(mockedRes.redirect).toHaveBeenCalledTimes(1);
        expect(mockedRes.redirect).toHaveBeenCalledWith(200, `/deregister?building=${ECS_ID}&number=${lockerNum}`);
    });

    it("Redirects to deregister when the locker is not available and reported", async () => {
        const lockerNum = 101;
        register(ECS_ID, lockerNum, "John Doe", "johndoe@uvic.ca", false);
        report(ECS_ID, lockerNum);
        const req = {
            method: "GET",
            query: {
                building: ECS_ID,
                number: lockerNum
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).not.toHaveBeenCalled();
        expect(mockedRes.redirect).toHaveBeenCalledTimes(1);
        expect(mockedRes.redirect).toHaveBeenCalledWith(200, `/deregister?building=${ECS_ID}&number=${lockerNum}&reported=true`);
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

        expect(mockedRes.redirect).not.toHaveBeenCalled();
        expect(mockedRes.status).toHaveBeenCalledTimes(1);
        expect(mockedRes.status).toHaveBeenCalledWith(404);
        expect(mockedJson).toHaveBeenCalledTimes(1);
        expect(mockedJson).toHaveBeenCalledWith({ message: "Locker not found" });
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

        expect(mockedRes.redirect).not.toHaveBeenCalled();
        expect(mockedRes.status).toHaveBeenCalledTimes(1);
        expect(mockedRes.status).toHaveBeenLastCalledWith(400);
        expect(mockedJson).toHaveBeenCalledTimes(1);
        expect(mockedJson).toHaveBeenCalledWith({ message: "Invalid query" });
    });
});