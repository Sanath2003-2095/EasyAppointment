import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private auth: Auth) {}

  register() {
    if (this.name && this.email && this.password) {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(userCredential => {
          this.error = '';
          // Set display name
          updateProfile(userCredential.user, { displayName: this.name })
            .then(() => {
              this.router.navigate(['/login']);
            });
        })
        .catch(error => {
          this.error = error.message || 'Registration failed. Please try again.';
        });
    }
  }
}
