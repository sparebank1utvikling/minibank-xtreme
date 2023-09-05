import * as fs from "fs";
import { stringify } from "csv-stringify";
import { parse } from "csv-parse";

export type ScoreData = {
  name: string,
  phone: string,
  score: number
}
const headers = [ 'name', 'phone', 'score' ];

export const saveStateToFile = (filePath: string, scoreBoard: ScoreData[]) => {
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

export const createFileForLeaderBoard = (filePath: string) => {
  //check if file exist
  if (fs.existsSync(filePath)) {
    //do process?
  } else {
    console.log("File doesn\'t exist.Creating new file")
    fs.writeFile(filePath, '', (err) => {
      if (err)
        console.log(err);
    })
  }
}

export const readCSVPromise = (filePath: string, sortAscending: boolean):Promise<ScoreData[]> => new Promise(function(myResolve, myReject) {
  const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: ScoreData[]) => {
    if (error) {
      console.error(error);
      myReject("File not found")
    }
    //sort results
    result = sort(result, sortAscending)
    myResolve(result)
  });
})

export const sort = (array:ScoreData[], sortAscending: boolean): ScoreData[] => {
  if(sortAscending) {
    return array.sort((a, b) => b.score - a.score)
  }
  return  array.sort((a, b) => a.score - b.score)
}