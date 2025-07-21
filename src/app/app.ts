import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive  } from '@angular/router';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('med-appointment');
  userName: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      console.log('Auth state changed:', user);
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.displayName || user.email || 'User';
      } else {
        this.isLoggedIn = false;
        this.userName = null;
      }
    });
  }

  logout() {
    signOut(this.auth);
  }
}
