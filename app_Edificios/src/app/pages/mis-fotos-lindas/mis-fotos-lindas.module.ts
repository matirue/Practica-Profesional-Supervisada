import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisFotosLindasPageRoutingModule } from './mis-fotos-lindas-routing.module';

import { MisFotosLindasPage } from './mis-fotos-lindas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisFotosLindasPageRoutingModule
  ],
  declarations: [MisFotosLindasPage]
})
export class MisFotosLindasPageModule {}
