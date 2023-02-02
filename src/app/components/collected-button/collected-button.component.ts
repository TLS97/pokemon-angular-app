import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectedService } from 'src/app/services/collected.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-collected-button',
  templateUrl: './collected-button.component.html',
  styleUrls: ['./collected-button.component.css']
})
export class CollectedButtonComponent implements OnInit{

  public loading: boolean = false;
  public isCollected: boolean = false;
  @Input() pokemonId: string = "";

  constructor(
    private readonly collectedService: CollectedService,
    private readonly trainerService: TrainerService,
  ){}

  ngOnInit(): void {
    this.isCollected = this.trainerService.inCollected(this.pokemonId);
  }

  onCollectedClick(): void {
    this.loading = true;
    //Collect pokémon
    this.collectedService.addToCollected(this.pokemonId)
    .subscribe({
      next: (trainer: Trainer) => {
        this.loading = false;
        this.isCollected = this.trainerService.inCollected(this.pokemonId);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    })
  }
}
