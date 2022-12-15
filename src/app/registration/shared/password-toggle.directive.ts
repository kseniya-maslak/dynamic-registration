import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: 'input[appPasswordToggle]',
})
export class PasswordToggleDirective implements OnInit {
  private hidden = true;
  @Input('appPasswordToggle') apply = true;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public el: ElementRef
  ) {}

  ngOnInit() {
    if (this.apply) {
      const icon = this.viewContainerRef.createComponent(MatIcon);
      this.hide(icon.instance);
      icon.instance._elementRef.nativeElement.classList.add('icon-visibility');
      icon.instance._elementRef.nativeElement.addEventListener('click', () =>
        this.toggle(icon.instance)
      );
    }
  }

  private toggle(icon: MatIcon) {
    this.hidden = !this.hidden;
    if (this.hidden) {
      this.hide(icon);
    } else {
      this.show(icon);
    }
  }

  private hide(icon: MatIcon) {
    this.el.nativeElement.setAttribute('type', 'password');
    icon._elementRef.nativeElement.innerHTML = 'visibility';
  }

  private show(icon: MatIcon) {
    this.el.nativeElement.setAttribute('type', 'text');
    icon._elementRef.nativeElement.innerHTML = 'visibility_off';
  }
}
