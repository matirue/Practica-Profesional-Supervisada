import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(
    private animationController: AnimationController,
    private router: Router
  ) { }

  ngOnInit() {
    const name: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.name'))
      .duration(2000)
      .fromTo('transform', 'translateX(400px)', 'translateX(0px)')

    const name1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.name'))
      .duration(2000)
      .fromTo('opacity', '1', '0'); 

    const curso: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.curso'))
      .duration(2000)
      .fromTo('transform', 'translateX(-400px)', 'translateX(0px)')

    const curso1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.curso'))
      .duration(2000)
      .fromTo('opacity', '1', '0'); 

    const animacion: Animation = this.animationController
    .create()
    .addElement(document.querySelector('.animacion1'))
    .duration(2000)
    .fromTo('opacity', '0', '1');
  
    const animacion1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.animacion1'))
      .duration(2000)
      .fromTo('opacity', '1', '0');
    
    name.play().then(()=>{
      name1.play();
    });
    
    curso.play().then(()=>{
      curso1.play();
    });
    
    animacion.play().then(() => {
      animacion1.play().then(() => {
        this.router.navigateByUrl('home');
      });
    });
  }

}
