import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { RouterModule } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { BodyMeasurementFormComponent } from '../dashboard/body-measurement-form/body-measurement-form.component';
import { UserService } from '../../../core/services/user.service'
import { BodyMeasurementService } from '../../../core/services/body-measurement.service'
import { User } from '../../../shared/interfaces/user.interface'
import { BodyMeasurement } from '../../../shared/interfaces/body-measurement.interface';

interface Activity {
  id: number;
  type: 'run' | 'gym';
  date: Date;
  distance?: number;
  duration?: string;
  pace?: string;
  exercise?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  notes?: string;
}

interface PersonalBest {
  category: string;
  value: string;
  date: Date;
  icon: string;
}


@Component({
  selector: 'app-dashboard',
  imports: [
    MatToolbarModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule,
    BaseChartDirective,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class Dashboard implements OnInit {
  private dialog = inject(Dialog);

  private bodyMeasurementService = inject(BodyMeasurementService);
  private userService = inject(UserService);

  users: User[] = [];

  userName = signal('');
  greeting: string = '';

  // Stats
  weeklyDistance: number = 24.5;
  weeklyGymSessions: number = 3;
  weeklyCalories: number = 1850;
  bodyWeight: number = 84;
  bestPace: string = '5:12';

  // Weekly progress (percentage of goal)
  weeklyGoal: number = 40; // 40km goal
  weeklyProgress: number = 0;

  // Recent activities
  recentActivities: Activity[] = [];

  // Personal bests
  personalBests: PersonalBest[] = [];

  // Weekly distance chart
  weeklyDistanceData: ChartData<'bar'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        data: [12, 15, 18, 22, 20, 25, 28, 32],
        label: 'Distance (km)',
        backgroundColor: '#3f51b5',
        borderRadius: 8
      }
    ]
  };

  weeklyDistanceOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#e0e0e0' }
      }
    }
  };

  weeklyDistanceType: ChartType = 'bar';

  // Gym volume chart
  gymVolumeData: ChartData<'line'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        data: [2500, 2800, 3100, 3400, 3600, 3800, 4000, 4200],
        label: 'Volume (kg)',
        borderColor: '#ff4081',
        backgroundColor: 'rgba(255, 64, 129, 0.1)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#ff4081',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  gymVolumeOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#e0e0e0' }
      }
    }
  };

  gymVolumeType: ChartType = 'line';

  async ngOnInit() {
    this.setGreeting();
    this.calculateProgress();
    this.loadRecentActivities();
    this.loadPersonalBests();
    this.users = await this.userService.getAll();
    this.userName.set(this.users[0]?.name ?? 'No user found');
  }

  openForm() {
    const dialogRef = this.dialog.open(BodyMeasurementFormComponent, {
      data: { userId: this.users[0]?.id }
    });

    dialogRef.closed.subscribe(async result => {
      if (result) {
        const measurement = result as Omit<BodyMeasurement, 'id' | 'createdAt'>;
        await this.bodyMeasurementService.create(measurement);
      }
    });
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }

  calculateProgress() {
    this.weeklyProgress = (this.weeklyDistance / this.weeklyGoal) * 100;
  }

  loadRecentActivities() {
    this.recentActivities = [
      {
        id: 1,
        type: 'run',
        date: new Date(),
        distance: 5.2,
        duration: '30:00',
        pace: '5:46',
        notes: 'Good morning run'
      },
      {
        id: 2,
        type: 'gym',
        date: new Date(Date.now() - 86400000),
        exercise: 'Bench Press',
        sets: 3,
        reps: 8,
        weight: 80
      },
      {
        id: 3,
        type: 'gym',
        date: new Date(Date.now() - 86400000),
        exercise: 'Squat',
        sets: 3,
        reps: 10,
        weight: 100
      },
      {
        id: 4,
        type: 'run',
        date: new Date(Date.now() - 172800000),
        distance: 7.5,
        duration: '42:00',
        pace: '5:36'
      }
    ];
  }

  loadPersonalBests() {
    this.personalBests = [
      { category: 'Fastest 5km', value: '24:30', date: new Date('2024-03-10'), icon: 'directions_run' },
      { category: 'Longest Run', value: '15.2 km', date: new Date('2024-02-28'), icon: 'route' },
      { category: 'Bench Press', value: '100kg × 5', date: new Date('2024-03-15'), icon: 'fitness_center' },
      { category: 'Squat', value: '140kg × 3', date: new Date('2024-03-08'), icon: 'fitness_center' }
    ];
  }

  formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  getActivityIcon(type: 'run' | 'gym'): string {
    return type === 'run' ? 'directions_run' : 'fitness_center';
  }

  getActivityColor(type: 'run' | 'gym'): string {
    return type === 'run' ? 'primary' : 'accent';
  }

  getActivityDescription(activity: Activity): string {
    if (activity.type === 'run') {
      return `${activity.distance}km · ${activity.duration} · ${activity.pace}/km`;
    } else {
      return `${activity.exercise} · ${activity.sets}×${activity.reps}×${activity.weight}kg`;
    }
  }
}
