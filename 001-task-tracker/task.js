#!/usr/bin/env node

import { argv } from "process";
import { readFile, writeFile } from "fs";

const MAX_ARGS = 5;
const VALID_ACTIONS = {
  add: (description) => {
    console.log(`Adding ${description}`);
    const task = new Task(description);
    task.print();
    TaskList.createEmptyList();
  },
  update: (task) => console.log(`Updating ${task}`),
  delete: (id) => console.log(`Deleting task id ${id}`),
  list: (task) => console.log(`Listing ${task}`),
  mark: (task) => console.log(`Marking ${task}`),
};

class Task {
  constructor(description) {
    this.id = 123;
    this.description = description;
    this.status = "TODO";
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  print() {
    console.log("ID is: " + this.id);
    console.log("Description is: " + this.description);
    console.log("Status is: " + this.status);
    console.log("createdAt is: " + this.createdAt);
    console.log("updatedAt is: " + this.updatedAt);
  }
}

class TaskList {
  constructor() {}

  static createEmptyList() {
    writeFile("tasks.json", "[]\n", (err) => {
      if (err) console.error(err);
    });
  }
}

// Argument parsing and validation
const action_name = argv[2];
const action_info = argv.slice(3);

if (argv.length > MAX_ARGS) throw `Too many arguments.`; // TODO: Improve error message
if (!Object.keys(VALID_ACTIONS).includes(action_name))
  throw `Invalid action name: ${action_name}.`;

const action = VALID_ACTIONS[action_name];

action(action_info);
