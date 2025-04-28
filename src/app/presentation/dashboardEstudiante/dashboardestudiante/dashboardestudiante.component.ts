import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/guards/auth.guard';
import { DataStore } from '../../../data/stores/data.store';

@Component({
  selector: 'app-dashboardestudiante',
  imports: [RouterOutlet],
  templateUrl: './dashboardestudiante.component.html',
  styleUrl: './dashboardestudiante.component.scss'
})
export class DashboardestudianteComponent {


  constructor(public router: Router, private readonly auth: AuthService) {


  }

  CerrarSession() {
    this.auth.clearAll();
    this.router.navigateByUrl('');
  }

}
