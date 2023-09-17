import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("Password with less than 8 characters is invalid", () => {
    const actual = sut.checkPassword("1234567");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it("Password with more than 8 characters is valid", () => {
    const actual = sut.checkPassword("12345678Ab");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it("Password with no uppercase is invalid", () => {
    const actual = sut.checkPassword("12345abc");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("Password with uppercase is valid", () => {
    const actual = sut.checkPassword("12345Abc");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("Password with no lowercase is invalid", () => {
    const actual = sut.checkPassword("ABC");
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("Password with lowercase is valid", () => {
    const actual = sut.checkPassword("aBC");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("complex password is valid", () => {
    const actual = sut.checkPassword("1235abcE");
    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true);
  });

  it("admin password with no number is invalid", () => {
    const actual = sut.checkAdminPassword("abcABC");
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    expect(actual.valid).toBe(false);
  });

  it("admin password with number is valid", () => {
    const actual = sut.checkAdminPassword("abcABC58");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});
