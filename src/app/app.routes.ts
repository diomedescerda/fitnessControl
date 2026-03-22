import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gym } from './gym/gym';
import { Running } from './running/running';

export const routes: Routes = [
    {
        path: '',
        title: 'Training Track',
        component: Home,
        children: [
            {
                path: 'gym',
                title: 'Gym Track',
                component: Gym 
            },
            {
                path: 'running',
                title: 'Running Track',
                component: Running
            }
        ]
    }
];
