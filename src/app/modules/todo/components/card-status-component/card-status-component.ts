import { Component, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import {
  AllTodoQueryResponse,
  EnumStateTodo,
} from '@models/business/todo-model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoService } from '../../services/todo-service';
import { ItemTodoComponent } from '../item-todo-component/item-todo-component';
import { CommonModule } from '@angular/common';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-card-status-component',
  templateUrl: './card-status-component.html',
  // Asegúrate de que ItemTodoComponent y DragDropModule estén en 'imports' si estás en un Standalone Component
  // O en 'declarations' y 'imports' de un NgModule si lo usas.
  standalone: true, // Si es un standalone component (Angular 14+)
  imports: [ItemTodoComponent, DragDropModule, CommonModule],
})
export class CardStatusComponent implements OnInit {
  // Implementa OnInit
  readonly EnumStateTodo = EnumStateTodo;
  currentUserId = 1;
  todos: AllTodoQueryResponse[] = [];
  pendientes: AllTodoQueryResponse[] = [];
  enProgreso: AllTodoQueryResponse[] = [];
  completadas: AllTodoQueryResponse[] = [];
  canceladas: AllTodoQueryResponse[] = [];

  connectedTo: string[] = [
    'pendientesList',
    'enProgresoList',
    'completadasList',
    'canceladasList',
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos(this.currentUserId);
  }

  loadTodos(idUser: number, name?: string, stateTodo?: number): void {
    this.todoService
      .getAllTodos(idUser, name, stateTodo)
      .subscribe((response) => {
        this.todos = response.data ?? [];
        this.categorizeTodos();
      });
  }

  categorizeTodos() {
    this.pendientes = this.todos.filter(
      (t) => t.status === EnumStateTodo.NotStarted
    );
    this.enProgreso = this.todos.filter(
      (t) => t.status === EnumStateTodo.InProgress
    );
    this.completadas = this.todos.filter(
      (t) => t.status === EnumStateTodo.Completed
    );
    this.canceladas = this.todos.filter(
      (t) => t.status === EnumStateTodo.Cancelled
    );
  }

  drop(event: CdkDragDrop<AllTodoQueryResponse[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedTask = event.container.data[event.currentIndex];
      let newStatus: EnumStateTodo;

      switch (event.container.id) {
        case 'pendientesList':
          newStatus = EnumStateTodo.NotStarted;
          break;
        case 'enProgresoList':
          newStatus = EnumStateTodo.InProgress;
          break;
        case 'completadasList':
          newStatus = EnumStateTodo.Completed;
          break;
        case 'canceladasList':
          newStatus = EnumStateTodo.Cancelled;
          break;
        default:
          Toastify({
            text: 'Estado de lista desconocido. No se pudo actualizar la tarea.',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
          }).showToast();
          return;
      }

      movedTask.status = newStatus;

      this.todoService
        .updateTodo({
          idTodo: movedTask.id,
          name: movedTask.name,
          description: movedTask.description,
          status: movedTask.status,
          isCompleted: newStatus === EnumStateTodo.Completed,
          idUserCreate: this.currentUserId,
        })
        .subscribe({
          next: (response) => {
            if (response.success) {
              Toastify({
                text: response.message,
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
              }).showToast();
            } else {
              Toastify({
                text: response.message,
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                backgroundColor: 'linear-gradient(to right, #ffc371, #f7b731)',
              }).showToast();
            }
          },
          error: (err) => {
            Toastify({
              text: 'Error al actualizar la tarea. Revertiendo cambios.',
              duration: 4000, // Un poco más largo para errores
              close: true,
              gravity: 'top',
              position: 'right',
              backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
            }).showToast();
            this.loadTodos(this.currentUserId);
          },
        });
    }
  }

  trackByTodoId(index: number, item: AllTodoQueryResponse): number {
    return item.id;
  }
}
