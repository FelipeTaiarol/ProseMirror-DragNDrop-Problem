import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { DataResolver } from './app.resolver';
import { TaskComponent } from './home/nodeViews/task.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'dummy',  component: TaskComponent }
];
