import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { TaskComponent } from './home/tasks/task.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'dummy',  component: TaskComponent }
];
