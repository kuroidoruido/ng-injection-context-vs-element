import { ApplicationRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Webco } from './app/webco';

(async () => {
  const app: ApplicationRef = await createApplication({ providers: [] });
  const element = createCustomElement(Webco, { injector: app.injector });
  customElements.define('my-webco', element);
})();
