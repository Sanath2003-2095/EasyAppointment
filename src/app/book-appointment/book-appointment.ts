import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.html',
  styleUrls: ['./book-appointment.css'],
  imports:[FormsModule,CommonModule]
})

export class BookAppointment {
  patientName = '';
  doctor = '';
  date = '';
  reason = '';
  today: string = '';

  constructor() {
    // Today's date in yyyy-mm-dd for min attribute
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    this.today = `${d.getFullYear()}-${month}-${day}`;
  }

  bookAppointment(form: NgForm) {
    if (form.invalid) {
      // Don't book, form is invalid
      return;
    }
    const appointment = {
      patientName: this.patientName,
      doctor: this.doctor,
      date: this.date,
      reason: this.reason
    };
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert('Appointment Booked!');
    form.resetForm(); // Resets the form and fields
  }
}

