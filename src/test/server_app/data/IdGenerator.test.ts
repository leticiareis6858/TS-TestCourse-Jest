import { generateRandomId } from "../../../app/server_app/data/IdGenerator";

describe("IDGenerator test suite", () => {
  it("should retirn a random string", () => {
    const randomId = generateRandomId();

    expect(randomId.length).toBe(20);
  });
});
