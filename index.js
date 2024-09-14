import "dotenv/config";
import axios from "axios";
import { Command } from "commander";
import { Chalk } from "chalk";

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
  
    if (String(options.method).toLowerCase() === "get") {
      sendGetRequest(baseUrl, header, query);
    } else if (String(options.method).toLowerCase() === "post") {
      sendPostRequest(baseUrl, header, body, query);
    }
  });

program.parse();

function sendGetRequest(baseUrl, headers, query) {
  const url = processQuery(baseUrl, query);
  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      console.log(chalk.blue(JSON.stringify(res.data)));
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
}

function sendPostRequest(baseUrl, headers, body, query) {
  const url = processQuery(baseUrl, query);
  axios
    .post(url, body, {
      headers: headers,
    })
    .then((res) => {
      console.log(chalk.blue(JSON.stringify(res.data)));
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
}

function processQuery(baseUrl, query) {
  const queryCount = Object.keys(query).length;
  let counter = 0;
  if (queryCount) {
    for (const qKey in query) {
      if (!counter) baseUrl += `?${qKey}=${query[qKey]}`;
      else baseUrl += `&${qKey}=${query[qKey]}`;
      counter++;
    }
  }

  return baseUrl;
}
