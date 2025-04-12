import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[shadow]',
  standalone: true,
})
export class ShadowDirective {
  private shadow = '';

  @HostBinding('style.boxShadow')
  get boxshadow() {
    return this.shadow;
  }

  @HostListener('mouseenter')
  enter() {
    this.shadow = '5px 5px 5px 5px #f0ba4e';
  }

  @HostListener('mouseleave')
  leave() {
    this.shadow = '';
  }
}
