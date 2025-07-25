import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Contact } from './pages/contact/contact';
import { Chatbot } from './pages/chatbot/chatbot';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { AuthGuard } from './auth/guard';
import { About } from './pages/about/about';




export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'sobre', component: About, canActivate: [AuthGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'contato', component: Contact, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' } 
   
];
