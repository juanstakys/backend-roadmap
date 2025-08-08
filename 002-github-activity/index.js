#!/usr/bin/env node

import { argv } from "process";

const [, , user, ...rest] = argv;

console.log("Fetching data from user " + user);

const response = await fetch(`https://api.github.com/users/${user}/events`);
const rawData = JSON.parse(await response.text());

console.log(rawData.map((i) => i.type));
