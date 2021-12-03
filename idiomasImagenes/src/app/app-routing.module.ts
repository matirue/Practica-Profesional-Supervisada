import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'numeros',
    loadChildren: () => import('./paginas/numeros/numeros.module').then( m => m.NumerosPageModule)
  },
  {
    path: 'colores',
    loadChildren: () => import('./paginas/colores/colores.module').then( m => m.ColoresPageModule)
  },
  {
    path: 'animals',
    loadChildren: () => import('./paginas/animals/animals.module').then( m => m.AnimalsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
