export class StringUtils {
  public toUpperCase(arg: string) {
    if (!arg) {
      throw new Error("no argument!");
    }
    return toUpperCase(arg);
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  charactersArray: string[];
  length: number;
  extraInfo: Object | undefined;
};
/* instanbul ignore next */
export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    charactersArray: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
