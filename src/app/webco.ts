import { Component, inject, input, OnDestroy, signal, ViewEncapsulation } from "@angular/core";
import { RootService, MyEvent } from "./root-service";
import { PlatformService } from "./platform-service";
import { ProvidedWebcoService } from "./provided-webco-service";
import { ProvidedBootstrapService } from "./provided-bootstrap-service";
import { AnotherService } from "./another-service";
import { FirstService } from "./first-service";


@Component({
    selector: 'app-events',
    template: `
        <fieldset>
            <legend>{{title()}}</legend>
            <ul>
                @for (event of events(); track event.id) {
                    <li [attr.data-id]="event.id">{{event.message}}</li>
                }
            </ul>
        </fieldset>
    `
})
export class Events {
    title = input.required<string>();
    events = input.required<MyEvent[]>();
}

@Component({
    selector: 'app-root-events',
    imports: [Events],
    template: `<app-events title="RootService" [events]="service.events()" />`
})
export class RootEvents {
    service = inject(RootService);
}

@Component({
    selector: 'app-platform-events',
    imports: [Events],
    template: `<app-events title="PlatformService" [events]="service.events()" />`
})
export class PlatformEvents {
    service = inject(RootService);
}

@Component({
    selector: 'app-provided-webco-events',
    imports: [Events],
    template: `<app-events title="ProvidedWebcoService" [events]="service.events()" />`
})
export class ProvidedWebcoEvents {
    service = inject(ProvidedWebcoService);
}

@Component({
    selector: 'app-provided-bootstrap-events',
    imports: [Events],
    template: `<app-events title="ProvidedBootstrapService" [events]="service.events()" />`
})
export class ProvidedBootstrapEvents {
    service = inject(ProvidedBootstrapService);
}

@Component({
    selector: 'my-webco',
    imports: [RootEvents, PlatformEvents, ProvidedWebcoEvents, ProvidedBootstrapEvents],
    providers: [ProvidedWebcoService, FirstService, AnotherService],
    template: `
        <h1>I am a webco! [{{id()}}]</h1>
        <app-root-events />
        <app-platform-events />
        <app-provided-webco-events />
        <app-provided-bootstrap-events />
    `,
    encapsulation: ViewEncapsulation.ShadowDom
})
export class Webco implements OnDestroy {
    id = signal<number>(++(window as any).webcoCounter);
    firstService = inject(FirstService);

    constructor() {
        const msg = `${Webco.name} ${this.id()} I'm alive! 😈`;
        this.push(msg);
    }

    ngOnDestroy(): void {
        const msg = `${Webco.name} ${this.id()} I'm dying... 💀`;
        this.push(msg);
    }

    private push(msg: string) {
        this.firstService.push(msg);
    }
}