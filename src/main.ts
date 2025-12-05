import { ApplicationRef, inject, provideAppInitializer } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Webco } from './app/webco';
import { ProvidedBootstrapService } from './app/provided-bootstrap-service';

(async () => {
  const app: ApplicationRef = await createApplication({
    providers: [
      { provide: ProvidedBootstrapService, useClass: ProvidedBootstrapService },
      provideAppInitializer(() => {
        const service = inject(ProvidedBootstrapService);
        service.push('BOOTSTRAP 👽');
      })
    ]
  });
  const element = createCustomElement(Webco, { injector: app.injector });
  customElements.define('my-webco', element);
})();
