import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-running-form',
  imports: [FormsModule],
  templateUrl: './running-form.component.html',
  styleUrl: '../template-form.component.scss',
})
export class RunningFormComponent {
  data = inject(DIALOG_DATA);
  dialogRef = inject(DialogRef)

  today = new Date().toISOString().split('T')[0];

  form = {
    distance: null,
    duration: null,
    avgHeartRate: null,
    maxHeartRate: null,
    caloriesBurned: null,
    notes: '',
    date: new Date().toISOString().split('T')[0]
  };

  showOptional: boolean = false;

  submit() {
    this.dialogRef.close({
      ...this.form,
      userId: this.data.userId
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
