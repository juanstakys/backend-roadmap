import { accessSync, constants, readFileSync, writeFileSync } from "fs";

// returns [isValidJson: bool, data: Object | error: Error].
function toValidJson(str) {
  try {
    data = JSON.parse(str);
  } catch (e) {
    return [error, null];
  }
  return [null, data];
}

function fileExists(file) {
  try {
    accessSync(this.path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

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
  constructor(tryLimit) {
    // Search first non-corrupt or non-existent file "tasksN.json"
    for (let tryCount = 1; tryCount <= tryLimit; tryCount++) {
      this.path = `tasks${tryCount}.json`;
      if (!fileExists(this.path)) {
        TaskList.createEmptyList(this.path);
        this.list = [];
        break;
      } else {
        const dataStr = readFileSync(this.path, { encoding: "utf-8" });
        const [error, data] = toValidJson(dataStr);
        if (error) continue;
        this.list = JSON.parse(data);
      }
    }
  }

  VALID_STATUSES = ["todo", "in-progress", "done"];

  static createEmptyList(path) {
    console.log("creating empty list");
    writeFileSync(path, "[]\n");
  }

  getLastId() {
    if (this.list.length) return this.list[this.list.length - 1]?.id;
    return 0;
  }

  addTask(task) {
    this.list.push(task);
    writeFileSync(this.path, JSON.stringify(this.list));
  }

  updateTask(id, description) {
    const task = this.list.find((task) => task.id == id); // Return task as REFERENCE. NOT COPY
    task.description = description; // Hence, editing the description of the tasks, immediately updates the list array.
    writeFileSync(this.path, JSON.stringify(this.list));
  }

  deleteTask(id) {
    const newList = this.list.filter((task) => task.id !== id);
    writeFileSync(this.path, JSON.stringify(newList));
  }

  markTask(id, status) {
    if (!this.VALID_STATUSES.includes(status)) throw "Invalid status";
    const task = this.list.find((task) => task.id == id);
    task.status = status;
    writeFileSync(this.path, JSON.stringify(this.list));
  }

  listTasks(status) {
    if (!status) {
      this.list.forEach((task) => {
        console.log(`${task.id}. ${task.description}\t\t${task.status}`);
      });
    } else if (!this.VALID_STATUSES.includes(status)) throw "Invalid status";
    this.list.forEach((task) => {
      if (task.status === status) {
        console.log(`${task.id}. ${task.description}\t\t${task.status}`);
      }
    });
  }
}

export const taskList = new TaskList(10);
