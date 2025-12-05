import { Injectable, OnDestroy, signal } from "@angular/core";

export interface MyEvent {
    id: string;
    message: string;
}

@Injectable()
export class ProvidedWebcoService implements OnDestroy {
    public readonly events = signal<MyEvent[]>([]);

    constructor() {
        console.log(`${ProvidedWebcoService.name} is starting...`);
    }

    push(message: string) {
        this.events.update(actual => [...actual, { id: crypto.randomUUID(), message }]);
    }

    ngOnDestroy(): void {
        console.log(`${ProvidedWebcoService.name} is dying...`);
    }
}