#!/usr/bin/env node

import { argv } from "process";
import { Task, taskList } from "../utils/TaskList.js";

const COMMAND_USAGE = `
Syntax:

  add <description>
    returns ID of the new task

  update <id> <description>

  delete <id>

  list [todo | in-progress | done]
    if no status is provided, list all tasks

  mark <id> [todo | in-progress | done]
  `;

const VALID_ACTIONS = {
  add: ([description]) => {
    if (!description) {
      console.log(COMMAND_USAGE);
      return;
    }
    const newId = taskList.getLastId() + 1;
    const task = new Task(newId, description);
    taskList.addTask(task);
    console.log(`Task added successfully (ID: ${newId})`);
  },
  update: ([id, description]) => {
    if (!id || !description) {
      console.log(COMMAND_USAGE);
      return;
    }
    try {
      if (typeof id !== "number") throw "Invalid ID";
      console.log("description:", description);
      taskList.updateTask(+id, description);
      console.log(`Task updated successfully`);
    } catch (err) {
      console.error(err);
      console.log(COMMAND_USAGE);
    }
  },
  delete: ([id]) => {
    try {
      if (isNaN(id)) throw "Invalid ID";
      taskList.deleteTask(+id);
      console.log(`Deleted task id ${id}`);
    } catch (err) {
      console.error(err);
      console.log(COMMAND_USAGE);
    }
  },
  list: ([status]) => {
    taskList.listTasks(status);
  },
  mark: ([status, id]) => {
    try {
      taskList.markTask(id, status);
      console.log(`Task marked ${status}`);
    } catch (err) {
      console.error(err);
      console.log(COMMAND_USAGE);
    }
  },
};

// Argument parsing and validation
const action_name =
  argv[2] ??
  (() => {
    console.log("Indicate an action name");
    console.log(COMMAND_USAGE);
    process.exit(0);
  })(); // IIFE
const action_info = argv.slice(3);

if (!Object.keys(VALID_ACTIONS).includes(action_name)) {
  console.log(`Invalid action name: ${action_name}.`);
  console.log(COMMAND_USAGE);
  process.exit(0);
}

const action = VALID_ACTIONS[action_name];

action(action_info);
