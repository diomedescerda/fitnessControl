import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gym } from './gym/gym';
import { Running } from './running/running';
import { RunningGraphs } from './running/running-graphs/running-graphs';

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
            },
            {
                path: 'running-graphs',
                title: 'Running Graphs',
                component: RunningGraphs
            }
        ]
    }
];
