import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/guards/auth.guard';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  constructor(public router: Router, private readonly auth: AuthService) {


  }




  CerrarSession() {
    this.auth.clearAll();
    this.router.navigateByUrl('');
  }

}
