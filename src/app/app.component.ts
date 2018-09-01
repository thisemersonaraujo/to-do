import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do';
  tasks: Array<string>;

  constructor() {
    this.getTasksFromSessionStorage();
  }

  addNewTask(newTask: string) {
    if (newTask.trim().length > 0) {
      this.setTask(newTask);
    }
  }

  private setTask(newTask: string) {
    if (this.tasks !== null) {
      this.tasks.push(newTask);
    }
    else {
      this.tasks = new Array<string>();
      this.tasks.push(newTask);
    }

    this.setTasksToSessionStorage(this.tasks);
  }

  private setTasksToSessionStorage(tasks: Array<string>) {
    sessionStorage.setItem('Tasks', JSON.stringify(this.tasks));
  }

  private getTasksFromSessionStorage() {
    this.tasks = JSON.parse(sessionStorage.getItem('Tasks'));
  }
}
