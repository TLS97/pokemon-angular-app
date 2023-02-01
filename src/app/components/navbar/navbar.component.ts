import { Component, EventEmitter, Output } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  constructor(
    private readonly trainerService: TrainerService,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) { }

  handleLogoutClick(): void {

    if (window.confirm('Are you sure?')) {
      this.loginService.logout(StorageKeys.Trainer)
      this.trainerService.trainer = undefined;
      this.router.navigateByUrl('/login')
    }
  }
}
