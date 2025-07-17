import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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

  constructor(private firestore: Firestore) {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    this.today = `${d.getFullYear()}-${month}-${day}`;
  }

  async bookAppointment(form: NgForm) {
    if (form.invalid) return;
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      await addDoc(appointmentsRef, {
        patientName: this.patientName,
        doctor: this.doctor,
        date: this.date,
        reason: this.reason
      });
      alert('Appointment Booked!');
      form.resetForm();
    } catch (error) {
      alert('Error booking appointment: ' + (error as any).message);
    }
  }
}
