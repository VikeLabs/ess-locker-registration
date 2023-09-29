import { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../../lib/db/init";
import handler from "./deregisterAll";
import { register } from "../../../lib/api/users/user";
import { ECS_ID, ELW_ID } from "../../../lib/locker_constants";

const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
} as unknown as jest.Mocked<NextApiResponse>;

beforeEach(() => {
    initDB();
})

describe("Testing deregisterAll handler", () => {
    it("Returns HTTP 200 when all deregistrations were successful", () => {

        for (let i = 65; i <= 90; i++) {
            let name = String.fromCharCode(i)
            let email = String.fromCharCode(i) + "@example.ca"
            let registrations = register(ELW_ID, i, name, email, false);
        }

        const req = {
            method: "GET",
            query: {}
        } as unknown as NextApiRequest;

        handler(req, mockedRes)

        expect(mockedRes.status).toHaveBeenCalledWith(200)
    });

    it("Returns 26 deregistrations", () => {

        const req = {
            method: "GET",
            query: {}
        } as unknown as NextApiRequest;

        for (let i = 65; i <= 90; i++) {
            let name = String.fromCharCode(i) + String.fromCharCode(i)
            let email = String.fromCharCode(i) + "@thing.ca"
            let registrations = register(ECS_ID, i, name, email, false);
        }

        handler(req, mockedRes)

        expect(mockedJson).toHaveBeenLastCalledWith(26)
    });


})