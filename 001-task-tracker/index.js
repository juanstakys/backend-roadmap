#!/usr/bin/env node

import { argv } from "process";
import { Task, taskList } from "./TaskList.js";

const MAX_ARGS = 5; // TODO: make it depend on the chosen action. add: 1, update: 2, delete: 1, mark: 2, list: 1.
const VALID_ACTIONS = {
  add: (description) => {
    const newId = taskList.getLastId() + 1;
    const task = new Task(newId, description);
    taskList.addTask(task);
    console.log(`Task added successfully (ID: ${newId})`);
  },
  update: (task) => {
    const [id, description] = task.split(" ", 2);
    taskList.updateTask(id, description);
    console.log(`Task updated successfully`);
  },
  delete: (id) => {
    taskList.deleteTask(+id);
    console.log(`Deleted task id ${id}`);
  },
  list: (status) => {
    taskList.list(status);
  },
  mark: (task) => {
    const [id, status] = task.split(" ", 2);
    taskList.markTask(id, status);
    console.log(`Task marked ${status}`); // TODO: Don't display if error
  },
};

// Argument parsing and validation
const action_name = argv[2];
const action_info = argv.slice(3).join(" ");

if (argv.length > MAX_ARGS) throw `Too many arguments.`; // TODO: Improve error message
if (!Object.keys(VALID_ACTIONS).includes(action_name))
  throw `Invalid action name: ${action_name}.`;

const action = VALID_ACTIONS[action_name];

action(action_info);
