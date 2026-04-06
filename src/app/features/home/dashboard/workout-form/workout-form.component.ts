import { Component, inject, signal, computed } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { Exercise } from '../../../../shared/interfaces/exercise.interface';

@Component({
  selector: 'app-workout-form',
  imports: [FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrl: '../template-form.component.scss',
})
export class WorkoutFormComponent {
  data = inject(DIALOG_DATA);
  dialogRef = inject(DialogRef)
  private exerciseService = inject(ExerciseService);

  numberOfSets = signal(1);

  setsAux = computed(() => Array.from({ length: this.numberOfSets() }));

  today = new Date().toISOString().split('T')[0];

  exercises = signal<Exercise[]>([]);
  exercisesTemp = computed(() => this.exercises().filter(exe => exe.name.includes(this.form.exercise())).slice(0, 2));

  form = {
    exercise: signal(''),
    notes: '',
    date: new Date().toISOString().split('T')[0]
  }

  exercisesForm: any[] = [];
  selectedExercise: Exercise | null = null;
  setsFields = computed(() => Array.from({ length: this.numberOfSets() }, (_, index) => ({ setNumber: index + 1, weight: null, reps: null })));

  showOptional: boolean = false;
  showDropdown: boolean = false

  async ngOnInit() {
    this.exercises.set(await this.exerciseService.getAll());
  }

  autoComplete(exercise: Exercise) {
    this.form.exercise.set(exercise.name);
    this.selectedExercise = exercise
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 10);
  }

  cancel() {
    this.dialogRef.close();
    this.exercisesForm = [];
  }

  addExercise() {
    this.exercisesForm.push({
      ...this.form,
      exerciseId: this.selectedExercise?.id,
      orderNumber: this.exercisesForm.length + 1,
      exerciseSets: this.setsFields()
    });

    this.form.exercise.set('');
    this.selectedExercise = null;
    this.numberOfSets.set(1);
  }

  submit() {
    const payload = {
      ...this.form,
      userId: this.data.userId,
      workoutExercises: this.exercisesForm
    };
    console.log(payload);
    this.dialogRef.close(payload);
  }
}
