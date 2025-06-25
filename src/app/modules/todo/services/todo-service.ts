import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AllTodoQueryResponse, UpdateTodo } from '@models/business/todo-model';
import { ResponseBase } from '@models/common/response-base-model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly URL = `${environment.apiUrlBase}`;

  constructor(private http: HttpClient) {}

  getAllTodos(
    idUser: number,
    name?: string,
    stateTodo?: number
  ): Observable<ResponseBase<AllTodoQueryResponse[]>> {
    const params: any = {
      IdUser: idUser,
    };

    if (name?.trim()) {
      params.Name = name.trim();
    }

    if (stateTodo != null) {
      params.StateTodo = stateTodo;
    }

    return this.http.get<ResponseBase<AllTodoQueryResponse[]>>(
      `${this.URL}/Todo/list-todo`,
      { params }
    );
  }

  updateTodo(request: UpdateTodo): Observable<ResponseBase<number>> {
    return this.http.put<ResponseBase<number>>(
      `${this.URL}/Todo/update-todo`,
      request
    );
  }
}
