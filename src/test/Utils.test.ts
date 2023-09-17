import { StringUtils, getStringInfo, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  describe.only("StringUtils teste", () => {
    let sut: StringUtils;

    //hooks
    beforeEach(() => {
      sut = new StringUtils();
      //console.log("setup");
    });

    /* afterEach(() => {
      //clearing mocks
      console.log("Teardown");
    }); */
    //hooks end. hooks: "beforeEach" and "afterEach", also "beforeAll" and "afterAll"
    //(these last tho are most used when we´re doing integrations e.g. tests when we´re doing a connection to the DB)
    //e.g. continuation: we do the beforeAll to connect to the DB and afterAll to shut down the DB connection

    test.only("should return correct uppercase", () => {
      const actual = sut.toUpperCase("ana");
      expect(actual).toBe("ANA");
    });

    test("should throw error on invalid arg-function", () => {
      function expectError() {
        const actual = sut.toUpperCase("");
      }
      expect(expectError).toThrow();
      //or
      expect(expectError).toThrowError("no argument!");
    });

    test("should throw error on invalid arg- arrow function", () => {
      expect(() => {
        sut.toUpperCase("");
      }).toThrowError("no argument!");
    });

    test("should throw error on invalid arg- try catch", (done) => {
      try {
        sut.toUpperCase("");
        done("GetStringInfo should throw error for invalid arg!");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        //or/also
        expect(error).toHaveProperty("message", "no argument!");
        done();
      }
    });
  });

  it("should return uppercase argument", () => {
    //arrage:
    const sut = toUpperCase;
    const expected = "ABCDEFG";
    //act:
    const actual = sut("abcdefg");
    //assert:
    expect(actual).toBe(expected);
  });

  describe("ToUpperCase examples", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "My-String", expected: "MY-STRING" },
      { input: "def", expected: "DEF" },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-StRiNg");
      expect(actual.charactersArray).toHaveLength(9);
    });

    test("return right lower case", () => {
      const actual = getStringInfo("My-StRiNg");
      expect(actual.lowerCase).toBe("my-string");
    });

    test("return right upper case", () => {
      const actual = getStringInfo("My-StRiNg");
      expect(actual.upperCase).toBe("MY-STRING");
    });

    test("return right characters", () => {
      const actual = getStringInfo("My-StRiNg");
      expect(actual.charactersArray).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "R",
        "i",
        "N",
        "g",
      ]);
      //OR
      expect(actual.charactersArray).toContain<string>("i");
      //OR
      expect(actual.charactersArray).toEqual(
        expect.arrayContaining(["-", "M", "y", "R", "S", "t", "N", "g", "i"])
      );
    });

    test("return defined extra info", () => {
      const actual = getStringInfo("My-StRiNg");
      expect(actual.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      const actual = getStringInfo("My-StRiNg");
      expect(actual.extraInfo).toEqual({});
    });
  });
});

//
/* //arrage
    const actual = getStringInfo("My-StRiNg");
    //act
    expect(actual.lowerCase).toBe("my-string");
    expect(actual.extraInfo).toEqual({}); */
/* expect(actual.charactersArray.length).toBe(9);
    //or
    expect(actual.charactersArray).toHaveLength(9); */

//});
