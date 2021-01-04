import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostListener('document:click', ['$event']) toggling(event: Event) {
    const targetElement: HTMLElement = (<HTMLElement>event.target);
    const menu: HTMLElement = this.element.nativeElement.nextElementSibling;
    if (!targetElement.classList.contains('dropdown-item')) {
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
      } else {
        if ((<HTMLElement>event.target).classList.contains('dropdown-toggle')) {
          menu.classList.add('show');
        }
      }

    }
  }
  constructor(private element: ElementRef) { }

}
