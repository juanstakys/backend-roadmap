#!/usr/bin/env node

import { argv } from "process";

const [, , user, ...rest] = argv;

console.log("Fetching data from user " + user);

const response = await fetch(`https://api.github.com/users/${user}/events`);

console.log(JSON.parse(await response.text()));
