#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<< ======================================== >>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<< =========== >>> ${chalk.bold.hex(`#9999FF`)(`Todo List`)} <<< ========== >>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<< ======================================== >>> \n`));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
// function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task :"
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.green(`\n ${newTask.task} task added successfully in Todo-list`));
};
//function to view all todo list
let viewTask = () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task, index) => {
        console.log(chalk.black(`${index + 1}: ${task}`));
    });
};
//function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index of the task you want to delete :",
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.red(`\n ${deleteTask} this task has been deleted successfully from your Todo-List`));
};
//function to update a task
let updateTask = async () => {
    await viewTask();
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the `index no` of the task you want to update :",
        },
        {
            name: "new_Task",
            type: "input",
            message: "Now enter new task name :",
        }
    ]);
    todoList[updateTaskIndex.index - 1] = updateTaskIndex.new_Task;
    console.log(chalk.yellowBright(`\n Task at index no. ${updateTaskIndex.index - 1} updated successfully [For updated list Check option: "View todo-List"]`));
};
main();
