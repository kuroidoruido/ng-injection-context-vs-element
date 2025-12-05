import { Injectable, signal } from "@angular/core";
import { NeedToBeResetOnWeboDestroy } from "./webco-lifecycle-hack-service";

export interface MyEvent {
    id: string;
    message: string;
}

@Injectable()
export class ProvidedBootstrapService implements NeedToBeResetOnWeboDestroy {
    public readonly events = signal<MyEvent[]>([]);

    constructor() {
        console.log(`${ProvidedBootstrapService.name} is starting...`);
    }

    push(message: string) {
        this.events.update(actual => [...actual, { id: crypto.randomUUID(), message }]);
    }

    resetOnWebcoDetroy(): void {
        console.log(`${ProvidedBootstrapService.name} is dying...`);
        this.events.set([]);
    }
}