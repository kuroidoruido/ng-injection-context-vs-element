import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { PlatformService } from "./platform-service";
import { ProvidedBootstrapService } from "./provided-bootstrap-service";
import { ProvidedWebcoService } from "./provided-webco-service";
import { RootService } from "./root-service";

export interface MyEvent {
    id: string;
    message: string;
}

@Injectable()
export class AnotherService implements OnDestroy {
    private readonly rootService = inject(RootService);
    private readonly platformService = inject(PlatformService);
    private readonly providedWebcoService = inject(ProvidedWebcoService);
    private readonly providedBootstrapService = inject(ProvidedBootstrapService);

    constructor() {
        console.log(`${AnotherService.name} is starting...`);
    }

    push(msg: string) {
        console.log(msg);
        this.rootService.push(msg);
        this.platformService.push(msg);
        this.providedWebcoService.push(msg);
        this.providedBootstrapService.push(msg);
    }

    ngOnDestroy(): void {
        console.log(`${AnotherService.name} is dying...`);
    }
}