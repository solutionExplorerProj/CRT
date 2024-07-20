import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  isDropdownOpen = false;
  isButtonHidden = false;
  isDropdownHidden = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  hideButton() {
    this.isButtonHidden = true;
    this.isDropdownHidden = true;
  }

}
