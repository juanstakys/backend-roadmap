import { readFileSync, writeFileSync } from "fs";

export class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.status = "todo";
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}

class TaskList {
  constructor() {
    this.path = "tasks.json";
  }

  VALID_STATUSES = ["todo", "in-progress", "done"];

  createEmptyList() {
    console.log("creating empty list");
    writeFileSync(this.path, "[]\n");
  }

  getList() {
    const data = readFileSync(this.path, { encoding: "utf-8" });
    if (data == "") return [];
    // TODO: handle invalid json file
    return JSON.parse(data);
  }

  getLastId() {
    const list = this.getList();
    if (list.length) return list[list.length - 1]?.id;
    return 0;
  }

  addTask(task) {
    let list = this.getList();
    list.push(task);
    writeFileSync(this.path, JSON.stringify(list));
  }

  updateTask(id, description) {
    const list = this.getList();
    const task = list.find((task) => task[field] == value); // Return task as REFERENCE. NOT COPY
    task.description = description; // Hence, editing the description of the tasks, immediately updates the list array.
    writeFileSync(this.path, JSON.stringify(list));
  }

  deleteTask(id) {
    const list = this.getList();
    const newList = list.filter((task) => task.id !== id);
    writeFileSync(this.path, JSON.stringify(newList));
  }

  markTask(id, status) {
    if (!this.VALID_STATUSES.includes(status)) throw "Invalid status";
    const list = this.getList();
    const task = list.find((task) => task[field] == value);
    task.status = status;
    writeFileSync(this.path, JSON.stringify(list));
  }

  list(status) {
    const list = this.getList();

    if (!status) {
      list.forEach((task) => {
        console.log(`${task.id}. ${task.description}\t\t${task.status}`);
      });
    } else if (!this.VALID_STATUSES.includes(status)) throw "Invalid status";
    list.forEach((task) => {
      if (task.status === status) {
        console.log(`${task.id}. ${task.description}\t\t${task.status}`);
      }
    });
  }
}

export const taskList = new TaskList();
