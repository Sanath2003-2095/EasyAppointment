import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
    this.appointments$ = collectionData(appointmentsRef, { idField: 'id' }) as Observable<any[]>;
  }

  async deleteAppointment(id: string) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      await deleteDoc(doc(this.firestore, `appointments/${id}`));
    }
  }
}
