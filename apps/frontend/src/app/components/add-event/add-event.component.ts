import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { EventsActions } from '../../+store/events/events.action';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent {
  eventForm = new FormGroup({
    titel: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ort: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    datum: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    start: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    end: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  constructor(
    private store: Store,
    private router: Router,
    private location: Location
  ) {}

  submit(): void {
    if (this.eventForm.invalid) {
      Object.keys(this.eventForm.controls).forEach((field) => {
        const control = this.eventForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });
      return;
    }

    const baseEvent: Event = {
      summary: this.eventForm.value.titel || '',
      location: this.eventForm.value.ort || '',
      start: this.timestamp(this.eventForm.value.start || '00:00'),
      end: this.timestamp(this.eventForm.value.end || '00:00'),
      description: this.eventForm.value.description || '',
      name: this.eventForm.value.titel || '',
      date: this.eventForm.value.datum || '',
      time: this.eventForm.value.start || '',
      by: 'di',
      poster: '',
    };

    this.store.dispatch(EventsActions.saveEvent({ event: baseEvent }));
    this.router.navigate(['/dashboard']);
  }
  timestamp = (time?: string) => `${this.eventForm.value.datum}T${time}`;

  goBack(): void {
    this.location.back();
  }
}
