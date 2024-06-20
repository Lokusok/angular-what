import { Routes } from '@angular/router';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

import { LayoutComponent } from './components/layout/layout.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
        title: 'Главная',
      },
      {
        path: 'create',
        component: CreatePageComponent,
        title: 'Создание',
      },
      {
        path: 'user/:id',
        component: UserPageComponent,
        title: 'Пользователь',
      },
    ],
  },
];
