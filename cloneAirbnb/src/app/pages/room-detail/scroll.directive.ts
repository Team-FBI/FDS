import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  scrollToTop = 640;
  scrollTobottom = 1340;

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  @HostListener('window:scroll') handler() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'position',
      window.pageYOffset > this.scrollToTop ? 'sticky' : ''
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'top',
      window.pageYOffset > this.scrollToTop ? '20px' : '650px'
    );
    // this.renderer.setStyle(
    //   this.el.nativeElement,
    //   'position',
    //   window.pageYOffset > this.scrollTobottom ? 'absolute' : '');
    // this.renderer.setStyle(
    //   this.el.nativeElement,
    //   'border',
    //   window.pageYOffset > this.scrollToTop ? '1px solid #e0e0e0' : '1px solid #e0e0e0');
    // this.renderer.setStyle(
    //   this.el.nativeElement,
    //   'padding',
    //   window.pageYOffset > this.scrollToTop ? '0 20px' : '0 20px');
  }
}
