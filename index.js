// package imports
import "dotenv/config";
import axios from "axios";
import { Command } from "commander";
import { Chalk } from "chalk";

// local imports
import { createFile, saveExample } from "./save-examples.js";

const program = new Command();
const chalk = new Chalk();

program.name("CLI postman").description("application to send HTTP requests");

program
  .command("url")
  .argument("<string>", "URL")
  .description("Enter the URL to send request default method is GET")
  .option("-m, --method <type>", "HTTP method to send request", "get")
  .option("-h, --header <type>", "header format in JSON")
  .option("-b, --body <type>", "body format in JSON")
  .option("-q --query <type>", "query to embed in url in JSON")
  .action((baseUrl, options) => {
    const header = options.header ? JSON.parse(options.header) : {};
    const body = options.body ? JSON.parse(options.body) : {};
    const query = options.query ? JSON.parse(options.query) : {};

    sendRequest(
      baseUrl,
      String(options.method).toLowerCase(),
      header,
      body,
      query
    );
  });

program.parse();

function sendRequest(baseUrl, method, headers, body, query) {
  if (method === "get") body = undefined;
  axios({
    method: method,
    url: baseUrl,
    headers: headers,
    data: body,
    params: query,
  })
    .then((res) => {
      const data = JSON.stringify(res.data);
      const fileName = createFile();
      if (fileName) {
        saveExample(fileName, data);
      } else {
        console.log(chalk.blue(JSON.stringify(res.data)));
      }
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
}

