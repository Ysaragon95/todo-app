import { Component, input } from '@angular/core';
import { AllTodoQueryResponse } from '@models/business/todo-model';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-item-todo-component',
  imports: [],
  templateUrl: './item-todo-component.html',
})
export class ItemTodoComponent {
  name = input.required();
  description = input();
}
