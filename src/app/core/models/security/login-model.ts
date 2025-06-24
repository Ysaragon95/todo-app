export interface LoginResponse {
  idUser: number;
  userName: string;
  token: string;
  expiration: string; // Se puede convertir a Date si lo necesitas
}
