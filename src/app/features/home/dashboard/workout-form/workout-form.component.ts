import { Component, inject, signal, computed } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  imports: [FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrl: '../template-form.component.scss',
})
export class WorkoutFormComponent {
  data = inject(DIALOG_DATA);
  dialogRef = inject(DialogRef)

  sets = signal(1);

  setsAux = computed(() => Array.from({ length: this.sets() }));

  today = new Date().toISOString().split('T')[0];

  /*
        * Incline Barbell Bench Press: 3 Sets
        Working Set: [6-8] Reps
        Notes: best rep 20kg per 12
        Track:
            Weight: Reps:
            Weight: Reps:
            Weight: Reps:
 */

 // example
  exercisesNames = ["Bench Press", "Squat", "Deadlift"];
  exercisesTemp = computed(() => this.exercisesNames.filter(exe => exe.includes(this.form.exercise())).slice(0,2));

  form = {
    exercise: signal(''),
    weight: null,
    reps: null,
    notes: '',
    date: new Date().toISOString().split('T')[0]
  }

  showOptional: boolean = false;
  showDropdown: boolean = false

  submit() {
    this.dialogRef.close({
      ...this.form,
      exercise: this.form.exercise(),
      userId: this.data.userId
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  autoComplete(name: string) {
    this.form.exercise.set(name);
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 10);
  }
}
