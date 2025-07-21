import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css'],
  imports:[CommonModule]
})
export class AppointmentList {
  appointments$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const appointmentsRef = collection(this.firestore, 'appointments');
    this.appointments$ = collectionData(appointmentsRef, { idField: 'id' }).pipe(
      map((appointments: any[]) => appointments.sort((a, b) => this.getRiskPriority(b.risk) - this.getRiskPriority(a.risk)))
    );
  }

  getRiskPriority(risk: string): number {
    switch (risk) {
      case 'serious': return 3;
      case 'high': return 2;
      case 'mild': return 1;
      default: return 0;
    }
  }

  async deleteAppointment(id: string) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      await deleteDoc(doc(this.firestore, `appointments/${id}`));
    }
  }
}
