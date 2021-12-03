import { Component, OnInit } from '@angular/core';
import { GameResult } from 'src/app/models/game-result';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-top3',
  templateUrl: './top3.component.html',
  styleUrls: ['./top3.component.scss'],
})
export class Top3Component implements OnInit {

  games:GameResult[];

  constructor(private gameService:GameService) {
    this.games = [];
  }

  ngOnInit() {
    this.gameService.items.subscribe((items) => {
      this.games = items;
      console.log(this.games.length);
    });
  }

}
