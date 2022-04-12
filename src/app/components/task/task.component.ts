import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import {Task} from '../../interfaces/Task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }
 
  deleteTask(task:Task){
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task:Task){
    task.important = !task.important
    this.taskService
      .toggleReminder(task)
      .subscribe();
  }

  addTask(task:Task){
    this.taskService.addTask(task).subscribe(
      (task) => this.tasks.push(task)
    )
  }

  
}
