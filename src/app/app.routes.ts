import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Contact } from './pages/contact/contact';
import { Chatbot } from './pages/chatbot/chatbot';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { Home } from './pages/home/home';
import { AuthGuard } from './auth/guard';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  {path: 'contato', component: Contact, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login' } 
   
];
