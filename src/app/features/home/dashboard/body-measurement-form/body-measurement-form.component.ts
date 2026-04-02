import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-body-measurement-form',
  imports: [FormsModule],
  templateUrl: './body-measurement-form.component.html',
  styleUrl: './body-measurement-form.component.scss',
})
export class BodyMeasurementFormComponent {
  data = inject(DIALOG_DATA);
  dialogRef = inject(DialogRef)

  form = {
    weight: null,
    chest: null,
    waist: null,
    hips: null,
    bicep: null,
    thigh: null,
    calf: null,
    notes: ''
  }

  showOptional: boolean = false;

  submit() {
    this.dialogRef.close({
      ...this.form,
      userId: this.data.userId,
      date: new Date().toISOString().split('T')[0]
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
