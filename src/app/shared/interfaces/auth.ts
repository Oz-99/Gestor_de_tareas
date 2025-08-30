// src/app/shared/interfaces/auth.ts

export interface LoginResponse {
  msg: string;
  usuario: {
    id: string;
    nombre: string;
  };
}