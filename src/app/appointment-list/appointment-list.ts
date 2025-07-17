import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css'],
  imports:[CommonModule]
})
export class AppointmentList implements OnInit {
  appointments: any[] = [];

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  }

  deleteAppointment(index: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointments.splice(index, 1);
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }
}
