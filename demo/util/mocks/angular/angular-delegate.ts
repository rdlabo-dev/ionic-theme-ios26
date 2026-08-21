import { ApplicationRef, NgZone, Injector, EnvironmentInjector, ComponentRef } from '@angular/core';
import type { AngularDelegate } from '@ionic/angular/common';

type AngularFrameworkDelegate = ReturnType<AngularDelegate['create']>;

export class MockAngularDelegate {
  create(environmentInjector: EnvironmentInjector, injector: Injector, elementReferenceKey?: string): MockAngularFrameworkDelegate {
    return new MockAngularFrameworkDelegate();
  }
}

export class MockAngularFrameworkDelegate implements Pick<AngularFrameworkDelegate, 'attachViewToDom' | 'removeViewFromDom'> {
  async attachViewToDom(container: any, component: any, params?: any, cssClasses?: string[]): Promise<any> {
    // no-op
  }

  async removeViewFromDom(_container: any, component: any): Promise<void> {
    // no-op
  }
}
