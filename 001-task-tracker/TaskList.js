import { readFileSync, writeFileSync } from "fs";

export class Task {
  constructor(id, description) {
    this.description = description;
    this.status = "TODO";
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

  createEmptyList() {
    writeFileSync(this.path, "[]\n");
  }

  getList() {
    const data = readFileSync(this.path);
    console.log(data);

    return JSON.parse(data);
  }

  getLastId() {
    const data = readFileSync(this.path);
    const list = JSON.parse(data);
    return list[list.length - 1]?.id;
  }

  addTask(task) {
    let list = this.getList();
    list.push(task);
    writeFileSync(this.path, JSON.stringify(list));
  }
}

export const taskList = new TaskList();
