import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { BookAppointment } from './book-appointment/book-appointment';
import { AppointmentList } from './appointment-list/appointment-list';
import { Register } from './register/register';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'book', component: BookAppointment },
  { path: 'list', component: AppointmentList },
   { path: 'register', component: Register },
  { path: 'login', component: Login }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
