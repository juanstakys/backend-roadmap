#!/usr/bin/env node

import { argv } from "process";
import { Task, taskList } from "./TaskList.js";

const MAX_ARGS = 5; // TODO: make it depend on the chosen action. add: 1, update: 2, delete: 1, mark: 2, list: 1.
const VALID_ACTIONS = {
  add: (description) => {
    console.log(`Adding ${description}`);
    const task = new Task(description);
    task.print();
    taskList.createEmptyList();
    taskList.addTask(task);
  },
  update: (task) => console.log(`Updating ${task}`),
  delete: (id) => console.log(`Deleting task id ${id}`),
  list: (task) => console.log(`Listing ${task}`),
  mark: (task) => console.log(`Marking ${task}`),
};

// Argument parsing and validation
const action_name = argv[2];
const action_info = argv.slice(3);

if (argv.length > MAX_ARGS) throw `Too many arguments.`; // TODO: Improve error message
if (!Object.keys(VALID_ACTIONS).includes(action_name))
  throw `Invalid action name: ${action_name}.`;

const action = VALID_ACTIONS[action_name];

action(action_info);
