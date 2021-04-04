import {Directive, NgZone, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[oneTime]',
})
export class OneTimeDirective {
  constructor(template: TemplateRef<any>, container: ViewContainerRef, zone: NgZone) {
    zone.runOutsideAngular(() => {
      const view = container.createEmbeddedView(template);
      setTimeout(() => view.detach());
    })
  }
}
