import path from "path";
import * as fs from "fs";
import { ExpectedDataType } from "../dto/types.ts";

class ExpectedData {
  private static dataContainer: ExpectedDataType | null = null;


  static getData(src: string = "") {
    if (ExpectedData.dataContainer === null) {
      const cwd = process.cwd();
      const cwdSplit = cwd.split(path.sep);
      let expectedDataSrc = "";
      if (cwdSplit[cwdSplit.length - 1].toLowerCase() === "frameworkbase")
        expectedDataSrc = src ? src : path.join(cwd, path.sep, "data", path.sep, "pages", path.sep, "expectedData.json");
      if (fs.existsSync(expectedDataSrc)) ExpectedData.dataContainer = JSON.parse(fs.readFileSync(expectedDataSrc).toString())
      else console.log("file not exist");
    }
    return ExpectedData.dataContainer;
  }
}
const expectedData = ExpectedData.getData();
export default expectedData;