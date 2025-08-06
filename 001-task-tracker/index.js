#!/usr/bin/env node

import { argv } from "process";
import { Task, taskList } from "./TaskList.js";

const VALID_ACTIONS = {
  add: ([description]) => {
    const newId = taskList.getLastId() + 1;
    const task = new Task(newId, description);
    taskList.addTask(task);
    console.log(`Task added successfully (ID: ${newId})`);
  },
  update: ([id, description]) => {
    console.log("description:", description);
    taskList.updateTask(id, description);
    console.log(`Task updated successfully`);
  },
  delete: ([id]) => {
    taskList.deleteTask(+id);
    console.log(`Deleted task id ${id}`);
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
    }
  },
};

// Argument parsing and validation
const action_name = argv[2];
const action_info = argv.slice(3);

if (!Object.keys(VALID_ACTIONS).includes(action_name))
  throw `Invalid action name: ${action_name}.`;

const action = VALID_ACTIONS[action_name];

action(action_info);
