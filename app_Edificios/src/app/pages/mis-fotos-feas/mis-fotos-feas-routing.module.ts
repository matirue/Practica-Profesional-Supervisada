import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisFotosFeasPage } from './mis-fotos-feas.page';

const routes: Routes = [
  {
    path: '',
    component: MisFotosFeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisFotosFeasPageRoutingModule {}
