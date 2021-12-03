import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GameResult } from '../models/game-result';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService<GameResult> {

  constructor(private fire:AngularFirestore) { 
    super(fire);
    this.setCollectionOrderBy("result", "time");
  }
}
