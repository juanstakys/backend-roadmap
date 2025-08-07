# Task CLI

## Description

This program creates and tracks an easy-to-use portable todo list

## Requirements
- GNU/Linux OS (other OSes not tested)
- NodeJS v22.13.1 (other versions not tested)

## Instalation

TODO

## Usage

```sh
Syntax

task command <command options>

commands:

  add <description>
    returns ID of the new task

  update <id> <description>

  delete <id>

  list [todo | in-progress | done]
    if no status is provided, list all tasks

  mark <id> [todo | in-progress | done]

Caveats:
For multi-word descriptions, wrap <description> in single or double quotarion marks.
ID should be a positive integer.
  ```

## Q&A:

**What happens if update, delete, or mark is called with a non-existent ID? (error code, message, silent ignore)?**

R: The programs gives you a warning and returns normally, displaying the correct syntax (TODO: Improve this, it's not necessary to show the syntax if the ID is invalid. It adds unnecessary information to the user.)

**How and where is the data stored?**

R: As a JSON file in the $HOME/.local/share/taskcli folder, otherwise, check $XDG_DATA_HOME path.
