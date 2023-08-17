import * as fs from "fs";
import { stringify } from "csv-stringify";

export type ScoreData = {
  name: string,
  phone: string,
  score: number
}
const headers = [ 'name', 'phone', 'score' ];

export const saveStateToFile = (filePath:string, scoreBoard: ScoreData[]) => {
  console.log("Attempting write to file")
  const stringifier = stringify({header: false, columns: headers});
  const writableStream = fs.createWriteStream(filePath);
  try {
    scoreBoard.map(row => {
      stringifier.write(row);
    })
    stringifier.pipe(writableStream);
    console.log("Finished writing data to file: " + filePath);

  } catch (e) {
    console.log(e)
  }
}