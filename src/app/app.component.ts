import { Task } from './Task';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do';
  tasks: Array<Task>;
  newTask: string;

  constructor() {
    this.getTasksFromSessionStorage();
  }

  addNewTask() {
    if (this.newTask !== null) {
      this.setTask(this.newTask);
      this.clearNewTask();
    }
  }

  private setTask(newTask: string) {
    if (this.tasks === null)
      this.tasks = new Array<Task>();

    let taskId = this.newId();
    let task = new Task(taskId, newTask);
    this.tasks.push(task);

    this.setTasksToSessionStorage(this.tasks);
  }

  private clearNewTask() {
    this.newTask = null;
  }

  public changeTaskStatus(taskId: string) {
    this.tasks.forEach(task => {
      if (task.id == taskId)
        task.done = !task.done;
    });

    this.setTasksToSessionStorage(this.tasks);
  }

  public deleteTask(taskId: string) {
    let taskIndex = this.tasks.findIndex(t => t.id == taskId);
    this.tasks.splice(taskIndex, 1);

    this.setTasksToSessionStorage(this.tasks);
  }

  // ToDo: Need to create a service to set these methods below
  private newId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  private setTasksToSessionStorage(tasks: Array<Task>) {
    sessionStorage.setItem('Tasks', JSON.stringify(this.tasks));
  }

  private getTasksFromSessionStorage() {
    this.tasks = JSON.parse(sessionStorage.getItem('Tasks'));

    if (this.tasks === null)
      this.tasks = new Array<Task>();
  }
}
