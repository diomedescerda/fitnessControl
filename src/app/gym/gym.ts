import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Exercise } from '../interfaces/exercise'

@Component({
  selector: 'app-gym',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './gym.html',
  styleUrl: './gym.scss',
})
export class Gym {
  exercises: Exercise[] = [
    { id: 1, name: 'Bench Press', categoryId: 1, isCustom: false },
    { id: 2, name: 'Squat', categoryId: 1, isCustom: false },
    { id: 3, name: 'Deadlift', categoryId: 1, isCustom: false },
  ];
}
