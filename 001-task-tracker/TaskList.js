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

  static isValidFile(path) {
    const dataStr = readFileSync(this.path, { encoding: "utf-8" });
    const [err, _] = toValidJson(dataStr);
    return err == null;
  }

  getList() {
    const dataStr = readFileSync(this.path, { encoding: "utf-8" });
    if (dataStr == "") return [];
    // TODO: handle invalid json file
    const [isValid, data] = toValidJson(dataStr);
    if (isValid) return data;
    else console.error("Invalid JSON.");
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
    if (!this.VALID_STATUSES.includes(status)) throw "Invalid status";
    const list = this.getList();
    const task = list.find((task) => task.id == id);
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

export const taskList = new TaskList(10);
