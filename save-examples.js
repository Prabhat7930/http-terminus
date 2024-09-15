import chalk from "chalk";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require("readline-sync");

const requestPath = "./request";
const responsePath = "./response";

const generateDir = (path) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.log(err);
  }
};

generateDir(requestPath);
generateDir(responsePath);

export const createFile = () => {
  const permission = +readline.question(
    "do you want to save the response? yes=1, no=0: "
  );
  if (permission) {
    let fileName = readline.question("enter the filename without extension: ");
    return fileName.concat(".txt");
  }
  return 0;
};

export const saveExample = (fileName, response) => {
  const filePath = `${responsePath}/${fileName}`;
  fs.writeFile(filePath, response, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        chalk.blue(
          "response saved successfully in ",
          `${responsePath}/${fileName}`
        )
      );
    }
  });
};
