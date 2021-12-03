import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisFotosFeasPageRoutingModule } from './mis-fotos-feas-routing.module';

import { MisFotosFeasPage } from './mis-fotos-feas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisFotosFeasPageRoutingModule
  ],
  declarations: [MisFotosFeasPage]
})
export class MisFotosFeasPageModule {}
