import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly trainerService: TrainerService
  ) {}

  handleLogin(): void {
    this.router.navigateByUrl('/catalogue');
  }

  ngOnInit(): void {
    if (this.trainerService.trainer) {
      this.router.navigateByUrl('/catalogue');
    }
  }
}
