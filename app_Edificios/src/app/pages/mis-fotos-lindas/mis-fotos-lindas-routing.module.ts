import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisFotosLindasPage } from './mis-fotos-lindas.page';

const routes: Routes = [
  {
    path: '',
    component: MisFotosLindasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisFotosLindasPageRoutingModule {}
