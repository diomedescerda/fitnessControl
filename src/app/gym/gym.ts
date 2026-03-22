import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {Exercise} from '../exercise'

@Component({
  selector: 'app-gym',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './gym.html',
  styleUrl: './gym.scss',
})
export class Gym {
  exercises: Exercise[] = [
    { id: 1, name: 'Bench Press', category_id: 1, is_custom: false },
    { id: 2, name: 'Squat', category_id: 1, is_custom: false },
    { id: 3, name: 'Deadlift', category_id: 1, is_custom: false },
  ];
}
