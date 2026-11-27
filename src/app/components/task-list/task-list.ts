import { Component, inject } from '@angular/core';
import { Task } from '../../services/task';

@Component({
  imports: [],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  protected readonly taskService = inject(Task);

  addTask(event: Event, input: HTMLInputElement): void {
    event.preventDefault();
    if (this.taskService.add(input.value)) {
      input.value = '';
    }
  }
}
