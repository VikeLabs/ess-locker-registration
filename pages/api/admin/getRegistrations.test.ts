import { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../../lib/db/init";
import { register } from "../../../lib/api/users/user"; 
import handler from "./getRegistrations";
import { ECS_ID, ELW_ID } from "../../../lib/locker_constants";

const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
} as unknown as jest.Mocked<NextApiResponse>;

beforeEach(() => {
    initDB();
})

describe("Testing getRegistration handler", () => {
    it("Returns HTTP 200 when it retrieves all registrations in the database", () => {

        let registrations = register(ELW_ID, 100, "Jeremy Pine", "jpine@example.com", false);
        
        const req = {
            method: "GET",
            query: {}
        } as unknown as NextApiRequest;

        handler(req, mockedRes)

        expect(mockedRes.status).toHaveBeenCalledWith(200)
    });

    it("Returns 2 registrations in the database", () => {

        let registrations = register(ECS_ID, 101, "Paul Willow", "pwillow@example.com", false);

        const req = {
            method: "GET",
            query: {}
        } as unknown as NextApiRequest;

        handler(req, mockedRes)

        expect(mockedJson).toHaveBeenLastCalledWith([{"building_id": ECS_ID, "num": 101, "reported_at": null, "user_id": 1}])
    });


})