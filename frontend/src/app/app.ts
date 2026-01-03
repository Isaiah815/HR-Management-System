import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  menuOpen = false;
  currentRoute: string = '';

  constructor(private router: Router,public auth: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isAuthPage(): boolean {
    return this.currentRoute === '/login' || this.currentRoute === '/register';
  }

   logout() {
    this.auth.logout(); 
    this.router.navigate(['/login']); 
  }
}
