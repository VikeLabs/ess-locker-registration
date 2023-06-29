import { appendsHello } from "./bar";

describe("appends hello function", () => {
  it("appends the name to message", () => {
    expect(appendsHello("world")).toBe("Hello world");
  });
});
