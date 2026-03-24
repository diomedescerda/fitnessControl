import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gym } from './gym/gym';
import { Running } from './running/running';
import { Dashboard} from './home/dashboard/dashboard';

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
