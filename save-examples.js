import fs from "fs";

const requestPath = "./request";
const responsePath = "./response";

export const generateDir = (path) => {
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
