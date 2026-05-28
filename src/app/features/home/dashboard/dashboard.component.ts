import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
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
import { WorkoutFormComponent } from '../dashboard/workout-form/workout-form.component';
import { RunningFormComponent } from '../dashboard/running-form/running-form.component';
import { UserService } from '../../../core/services/user.service'
import { BodyMeasurementService } from '../../../core/services/body-measurement.service'
import { RunningSessionService } from '../../../core/services/running-session.service'
import { WorkoutSessionService } from '../../../core/services/workout-session.service'
import { User } from '../../../shared/interfaces/user.interface'
import { BodyMeasurement } from '../../../shared/interfaces/body-measurement.interface';
import { RunningSession } from '../../../shared/interfaces/running-session.interface';
import { WorkoutSession } from '../../../shared/interfaces/workout-session.interface';

interface RecentActivity {
  id: string;
  type: 'run' | 'workout';
  date: string;
  distance?: number;
  duration?: string;
  avgPace?: string;
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
    RouterModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class Dashboard implements OnInit {
  private dialog = inject(Dialog);

  private bodyMeasurementService = inject(BodyMeasurementService);
  private runningSessionService = inject(RunningSessionService);
  private workoutSessionService = inject(WorkoutSessionService);
  private userService = inject(UserService);

  users: User[] = [];

  userName = signal('');
  greeting: string = '';

  // Stats
  lastMeasurement: BodyMeasurement | null = null;
  weeklyDistance = signal(0);
  noGymSessions = signal(0);
  weeklyCalories: number = -1;
  bodyWeight = signal(0);
  bestPace: string = '5:12';

  // Weekly progress (percentage of goal)
  weeklyGoal: number = 20;
  weeklyProgress: number = 0;

  // Recent activities
  recentRunningSessions = signal<RunningSession[]>([]);
  recentWorkoutSessions = signal<WorkoutSession[]>([]);
  recentActivities = signal<RecentActivity[]>([]);

  // Personal bests
  personalBests: PersonalBest[] = [];

  // Weekly distance chart
  weeklyDistanceData: ChartData<'bar'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        data: [12, 15, 18, 22, 20, 25, 28, 32],
        label: 'Calories (Kcal)',
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
        label: 'Weight (kg)',
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
  selectedPeriodBodyWeight: 'day' | 'week' | 'month' = 'week';
  selectedPeriodCaloriesConsumed: 'day' | 'week' | 'month' = 'week';

  async ngOnInit() {
    this.setGreeting();
    this.loadPersonalBests();
    this.users = await this.userService.getAll();
    this.userName.set(this.users[0]?.name ?? 'Not found');
    this.lastMeasurement = await this.bodyMeasurementService.getMostRecentByUserId(this.users[0]?.id);
    this.bodyWeight.set(this.lastMeasurement?.weight ?? -1);
    this.weeklyDistance.set(await this.runningSessionService.getWeeklyDistanceByUserIdAndOffset(this.users[0]?.id, 0));
    this.noGymSessions.set(await this.workoutSessionService.getNoGymSessionsByUserIdAndOffset(this.users[0]?.id, 0));
    this.recentRunningSessions.set(await this.runningSessionService.getLastRunningSessionsByUserIdAndN(this.users[0]?.id, 5));
    this.recentWorkoutSessions.set(await this.workoutSessionService.getLastWorkoutSessionsByUserIdAndN(this.users[0]?.id, 5));
    this.loadRecentActivies();
    this.calculateProgress();
  }

  loadRecentActivies() {
    const runningSessions = this.recentRunningSessions().map(r => ({
      id: r.id,
      type: 'run' as const,
      date: r.date,
      distance: r.distance,
      duration: r.duration,
      avgPace: r.avgPace,
      notes: r.notes
    }));

    const workoutSessions = this.recentWorkoutSessions().map(w => ({
      id: w.id,
      type: 'workout' as const,
      date: w.date,
      notes: w.notes
    }));

    const combined = [...runningSessions, ...workoutSessions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    this.recentActivities.set(combined);
  }

  openWorkoutForm() {
    const dialogRef = this.dialog.open(WorkoutFormComponent, {
      data: { userId: this.users[0]?.id }
    });

    dialogRef.closed.subscribe(async result => {
      if (result) {
        const workoutSession = result as Omit<WorkoutSession, 'id'>;
        await this.workoutSessionService.create(workoutSession);
      }
    });
  }

  openRunningForm() {
    const dialogRef = this.dialog.open(RunningFormComponent, {
      data: { userId: this.users[0]?.id }
    });

    dialogRef.closed.subscribe(async result => {
      if (result) {
        const runningSession = result as Omit<RunningSession, 'id' | 'avgPace'>;
        await this.runningSessionService.create(runningSession);
      }
    });
  }

  openMeasurementForm() {
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
    this.weeklyProgress = (this.weeklyDistance() / this.weeklyGoal) * 100;
  }

  loadPersonalBests() {
    this.personalBests = [
      { category: 'Fastest 5km', value: '24:30', date: new Date('2024-03-10'), icon: 'directions_run' },
      { category: 'Longest Run', value: '15.2 km', date: new Date('2024-02-28'), icon: 'route' },
      { category: 'Bench Press', value: '100kg × 5', date: new Date('2024-03-15'), icon: 'fitness_center' },
      { category: 'Squat', value: '140kg × 3', date: new Date('2024-03-08'), icon: 'fitness_center' }
    ];
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateObj.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dateObj.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  formatTimeInterval(interval: string): string {
    const withoutDecimals = interval.split('.')[0]; // "00:06:15"
    const parts = withoutDecimals.split(':');   // ["00", "06", "15"]
    if (parts[0] === '00') {
      return `${parts[1]}:${parts[2]}`;         // "06:15"
    }
    return withoutDecimals;
  }

  getActivityIcon(type: 'run' | 'workout'): string {
    return type === 'run' ? 'directions_run' : 'fitness_center';
  }

  getActivityColor(type: 'run' | 'workout'): string {
    return type === 'run' ? 'primary' : 'accent';
  }

  getActivityDescription(activity: RecentActivity): string {
    if (activity.type === 'run') {
      return `Distance: ${activity.distance}km · Time: ${this.formatTimeInterval(activity.duration!)} · Pace: ${this.formatTimeInterval(activity.avgPace!)}/km`;
    } else {
      return activity.notes ?? 'Gym session';
    }
  }
}
