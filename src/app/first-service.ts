import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { PlatformService } from "./platform-service";
import { ProvidedBootstrapService } from "./provided-bootstrap-service";
import { ProvidedWebcoService } from "./provided-webco-service";
import { RootService } from "./root-service";
import { AnotherService } from "./another-service";

export interface MyEvent {
    id: string;
    message: string;
}

@Injectable()
export class FirstService implements OnDestroy {
    private readonly anotherService = inject(AnotherService);

    constructor() {
        console.log(`${FirstService.name} is starting...`);
    }

    push(msg: string) {
        this.anotherService.push(msg);
    }

    ngOnDestroy(): void {
        console.log(`${FirstService.name} is dying...`);
    }
}