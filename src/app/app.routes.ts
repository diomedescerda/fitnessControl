import { Routes } from '@angular/router';
import { Home } from './features/home/home.component';
import { Gym } from './features/gym/gym.component';
import { Running } from './features/running/running.component'
import { Dashboard } from './features/home/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Training Track',
        component: Home,
        children: [
          {
            path: '',
            component: Dashboard
          },
          {
            path: 'gym',
            title: 'Gym Track',
            component: Gym
          },
          {
            path: 'running',
            title: 'Running Track',
            component: Running
          },
        ]
    }
];
