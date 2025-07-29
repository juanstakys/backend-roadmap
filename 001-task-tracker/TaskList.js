import { readFile, writeFile } from "fs";

export class Task {
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

export class TaskList {
  constructor() {}

  static createEmptyList() {
    writeFile("tasks.json", "[]\n", (err) => {
      if (err) console.error(err);
    });
  }
}
