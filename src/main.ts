import { ApplicationRef, inject, provideAppInitializer } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Webco } from './app/webco';
import { ProvidedBootstrapService } from './app/provided-bootstrap-service';
import { resetableOnWebcoDestroy } from './app/webco-lifecycle-hack-service';

(async () => {
  const app: ApplicationRef = await createApplication({
    providers: [
      resetableOnWebcoDestroy(ProvidedBootstrapService),
      // ProvidedBootstrapService,
      // { provide: NeedToBeResetOnWeboDestroy, useFactory: () => inject(ProvidedBootstrapService), multi: true },
      provideAppInitializer(() => {
        const service = inject(ProvidedBootstrapService);
        service.push('BOOTSTRAP 👽');
      }),
    ]
  });
  const element = createCustomElement(Webco, { injector: app.injector });
  customElements.define('my-webco', element);
})();
