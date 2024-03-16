import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    const hamburgerIcon = document.getElementById('toggleSidebarMobileHamburger');
    const closeIcon = document.getElementById('toggleSidebarMobileClose');

    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }

    // Aquí puedes agregar más lógica según tus requisitos
    console.log('Botón clickeado');
  }
}
