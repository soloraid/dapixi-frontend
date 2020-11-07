import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostListener('click') toggling(event:Event){
    this.element.nativeElement.nextElementSibling.classList.toggle('show');
  }
  constructor(private element:ElementRef) { }

}
