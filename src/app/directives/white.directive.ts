import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[white]',
  standalone: true,
})
export class WhiteDirective {
  private color = '#fffff';

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.color;
  }

  @HostListener('mouseenter')
  enter() {
    this.color = '#f0ba4e';
  }

  @HostListener('mouseleave')
  leave() {
    this.color = '#ffffff';
  }
}
