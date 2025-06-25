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

  // --- AÑADE ESTA PROPIEDAD AQUÍ ---
  // Define un array con los IDs de todos tus cdkDropList
  // Esto hace que todas las listas estén conectadas entre sí
  connectedTo: string[] = [
    'pendientesList',
    'enProgresoList',
    'completadasList',
    'canceladasList',
  ];
  // ----------------------------------

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
      // Lógica para reordenar dentro de la misma lista
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Lógica para mover entre listas diferentes
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
          return; // No hacer nada si el ID del contenedor no coincide
      }

      // Actualiza el estado de la tarea en tu modelo de datos
      movedTask.status = newStatus;;

      // Llama al servicio para persistir el cambio
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
              console.log('Tarea actualizada con éxito:', response.message);
              // Podrías considerar un Toast/Snackbar en lugar de alert
            } else {
              console.warn(
                'Advertencia al actualizar tarea:',
                response.message
              );
            }
          },
          error: (err) => {
            console.error('Error al actualizar la tarea:', err);
            // Si la actualización falla, es buena práctica revertir el movimiento en el UI
            // o recargar los datos para asegurar la consistencia.
            this.loadTodos(this.currentUserId);
            alert('Error al actualizar la tarea. Revertiendo cambios.');
          },
        });
    }
  }

  trackByTodoId(index: number, item: AllTodoQueryResponse): number {
    return item.id;
  }
}
