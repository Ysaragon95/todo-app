export enum EnumStateTodo {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
}

export interface AllTodoQueryResponse {
  id: number;
  name: string;
  description: string;
  status: EnumStateTodo;
}

export interface UpdateTodo {
  idTodo: number;
  name: string;
  description: string | null;
  status: EnumStateTodo;
  isCompleted: boolean;
  idUserCreate: number;
}
