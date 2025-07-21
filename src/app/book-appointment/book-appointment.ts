import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

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
  risk = 'mild'; // or 'high', 'serious'

  constructor(private firestore: Firestore, private auth: Auth) {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    this.today = `${d.getFullYear()}-${month}-${day}`;
  }

  async bookAppointment(form: NgForm) {
    if (form.invalid) return;
    // Check if user is logged in
    if (!this.auth.currentUser) {
      alert('Please login to book an appointment.');
      return;
    }
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      await addDoc(appointmentsRef, {
        patientName: this.patientName,
        doctor: this.doctor,
        date: this.date,
        reason: this.reason,
        risk: this.risk
      });
      alert('Appointment Booked!');
      form.resetForm();
    } catch (error) {
      alert('Error booking appointment: ' + (error as any).message);
    }
  }
}
