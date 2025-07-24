import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Contact } from './pages/contact/contact';
import { Chatbot } from './pages/chatbot/chatbot';




export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'contato',
    component: Contact
  },
  {
    path: '**',
    redirectTo: ''
  }
  
   
];
