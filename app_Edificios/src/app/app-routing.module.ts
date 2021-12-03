import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChartfeoComponent } from './pages/charts/chartfeo/chartfeo.component';
import { ChartlindoComponent } from './pages/charts/chartlindo/chartlindo.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'cosas-feas',
    loadChildren: () => import('./pages/cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
  },
  {
    path: 'cosas-lindas',
    loadChildren: () => import('./pages/cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
  },
  {
    path: 'mis-fotos-lindas',
    loadChildren: () => import('./pages/mis-fotos-lindas/mis-fotos-lindas.module').then( m => m.MisFotosLindasPageModule)
  },
  {
    path: 'mis-fotos-feas',
    loadChildren: () => import('./pages/mis-fotos-feas/mis-fotos-feas.module').then( m => m.MisFotosFeasPageModule)
  },
  {
    path: 'chart-feo',
    component: ChartfeoComponent,
  },
  {
    path: 'chart-lindo',
    component: ChartlindoComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
