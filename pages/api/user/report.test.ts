import { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../../../../VikeLabs/ess-locker-registration/lib/db/init";
import handler from "./report";
import { register} from "../../../../../VikeLabs/ess-locker-registration/lib/api/users/user";
import { ECS_ID, ELW_ID } from "../../../../../VikeLabs/ess-locker-registration/lib/locker_constants";

const mockedJson = jest.fn();

const mockedRes = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
} as unknown as jest.Mocked<NextApiResponse>;

beforeEach(() => {
    initDB();
})

describe("Testing report handler", () => {

    it("Returns HTTP 200 when the locker is reported successfully", async () => {
        const req = {
            method: "POST",
            query: {
                building: ECS_ID,
                number: 200
            },
        } as unknown as NextApiRequest;

        register(ECS_ID, 200, "Liam Oak", "loak@example.com", false)
        
        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenCalledWith(200);
    });

    it("Returns true when the locker is reported successfully", async () => {


        const req = {
            method: "POST",
            query: {
                building: ECS_ID,
                number: 250
            },
        } as unknown as NextApiRequest;

        register(ECS_ID, 250, "Polly Putin", "pputin@example.com", false)

        handler(req, mockedRes);

        expect(mockedJson).toHaveBeenLastCalledWith(true);
    });

    it("Returns HTTP 404 when the locker does not exist", async () => {
        const req = {
            method: "POST",
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
            method: "POST",
            query: {
                building: "hello",
                number: "world"
            },
        } as unknown as NextApiRequest;

        handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(400);
    });

})
