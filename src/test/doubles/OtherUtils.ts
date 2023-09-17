import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCallBack,
} from "../../app/doubles/OtherUtils";

describe.skip("otherUtils test suite", () => {
  describe("otherstringutils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("abs");
      expect(toUpperCaseSpy).toBeCalledWith("abs");
    });

    test("use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toBeCalledWith("abc");
    });
  });

  describe("tracking callbacks with jest mocks", () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("touppercase- calls callback for invalid argument-track calls", () => {
      const actual = toUpperCaseWithCallBack("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toBeCalledWith("Invalid argument!");
      expect(callBackMock).toBeCalledTimes(1);
    });

    it("touppercase- calls callback for valid argument-track calls", () => {
      const actual = toUpperCaseWithCallBack("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackMock).toBeCalledWith("called function with abc");
      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  describe("tracking callbacks", () => {
    let callBackArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      callBackArgs.push(arg);
      timesCalled++;
    }

    //clear track fields
    afterEach(() => {
      (callBackArgs = []), (timesCalled = 0);
    });

    it("touppercase- calls callback for invalid argument-track calls", () => {
      const actual = toUpperCaseWithCallBack("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("touppercase- calls callback for valid argument-track calls", () => {
      const actual = toUpperCaseWithCallBack("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });

  it("touppercase- calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCallBack("", () => {});
    expect(actual).toBeUndefined();
  });

  it("touppercase- calls callback for valid argument", () => {
    const actual = toUpperCaseWithCallBack("abc", () => {});
    expect(actual).toBe("ABC");
  });

  it("calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      },
    };
    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
