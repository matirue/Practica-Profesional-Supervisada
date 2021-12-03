import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { InitComponent } from './pages/init/init.component';
import { LoginComponent } from './pages/login/login.component';
import { SplashComponent } from './pages/splash/splash.component';
import { Top3Component } from './pages/top3/top3.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"home", component:InitComponent, canActivate:[AuthGuard]},  
  {path:"game", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"top3", component:Top3Component, canActivate:[AuthGuard]},
  {path:"splash", component:SplashComponent},
  {path:"", redirectTo:"splash", pathMatch:"full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
