import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router)

  onLogOff(){
  this.router.navigateByUrl('/login')
  localStorage.removeItem('empErUser')
  }
}
