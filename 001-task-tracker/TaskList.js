import { readFileSync, writeFileSync } from "fs";

export class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.status = "todo";
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  print() {
    console.log("ID is: " + this?.id);
    console.log("Description is: " + this.description);
    console.log("Status is: " + this.status);
    console.log("createdAt is: " + this.createdAt);
    console.log("updatedAt is: " + this.updatedAt);
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
    const task = list.find((task) => task.id == id); // Return task as REFERENCE. NOT COPY
    task.description = description; // Hence, editing the description of the tasks, immediately updates the list array.
    writeFileSync(this.path, JSON.stringify(list));
  }

  deleteTask(id) {
    const list = this.getList();
    const newList = list.filter((task) => task.id !== id);
    writeFileSync(this.path, JSON.stringify(newList));
  }

  markTask(id, status) {
    if (!this.VALID_STATUSES.includes(status)) return;
    const list = this.getList();
    const task = list.find((task) => task.id == id); // TODO: Create method to find by id
    task.status = status;
    writeFileSync(this.path, JSON.stringify(list));
  }
}

export const taskList = new TaskList();
