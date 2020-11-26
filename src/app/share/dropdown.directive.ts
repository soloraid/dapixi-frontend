import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostListener('document:click',['$event']) toggling(event:Event){
      
      this.element.nativeElement.nextElementSibling.classList.toggle('show');
    
  }
  constructor(private element:ElementRef) { }

}
