import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { ListaComponent } from './components/lista/lista';
import { CrearComponent } from './components/crear/crear';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // 👈 Ruta inicial
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }  // 👈 Ruta por defecto si no existe
];
