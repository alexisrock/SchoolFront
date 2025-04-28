import { Routes } from '@angular/router';
import { AuthService } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./presentation/login/login.module').then(m => m.LoginModule)},
  {path: 'registrousuario', loadChildren: () => import('./presentation/usuario/usuario.module').then(m => m.UsuarioModule)},
  {path: 'dashboard',canActivate: [AuthService], loadChildren: () => import('./presentation/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'estudiante',canActivate: [AuthService], loadChildren: () => import('./presentation/dashboardEstudiante/dashboardestudiante.module').then(m => m.DashboardestudianteModule)}




];
