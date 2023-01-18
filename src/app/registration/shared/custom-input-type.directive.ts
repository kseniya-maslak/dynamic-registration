import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SupportedFieldTypesEnum } from '../../model/supported-field-types.enum';

@Directive({
  selector: 'input[appCustomInputType]',
})
export class CustomInputTypeDirective implements OnChanges {
  private hidden = true;
  private icon?: ComponentRef<MatIcon>;
  @Input('appCustomInputType') type?: SupportedFieldTypesEnum;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public el: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.el.nativeElement.setAttribute('type', this.type);
    if (this.type === SupportedFieldTypesEnum.PASSWORD) {
      this.icon = this.addIcon();
      this.toggle(this.icon.instance, this.hidden);
    } else {
      this.removeIcon();
    }
  }

  private removeIcon() {
    if (this.icon) {
      this.icon.destroy();
      delete this.icon;
    }
  }

  private addIcon(): ComponentRef<MatIcon> {
    if (!this.icon) {
      const icon = this.viewContainerRef.createComponent(MatIcon);
      this.hide(icon.instance);
      icon.instance._elementRef.nativeElement.classList.add('icon-visibility');
      icon.instance._elementRef.nativeElement.addEventListener('click', () =>
        this.toggle(icon.instance, !this.hidden)
      );
      return icon;
    }
    return this.icon;
  }

  private toggle(icon: MatIcon, hidden: boolean) {
    this.hidden = hidden;
    if (hidden) {
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
