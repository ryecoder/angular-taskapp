import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Task} from '../../interfaces/Task';
import {UiService} from '../../service/ui.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day:string;
  important:boolean = false;
  showAddTask:boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(
      val => this.showAddTask = val
    )
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.text){
      alert('Please enter a text')
    }

    const newTask = {
      text:this.text,
      day:this.day,
      important:this.important
    }

    this.onAddTask.emit(newTask)

    this.text = ''
    this.day = ''
    this.important = false
  }


}
