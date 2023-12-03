import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamiccomponentserviceService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent(component: any, container: ViewContainerRef) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    container.clear();
    const componentRef = container.createComponent(componentFactory);
    // You can pass data to the component if needed: componentRef.instance.data = yourData;
  }
}
