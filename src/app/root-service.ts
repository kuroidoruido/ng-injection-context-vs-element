import { Injectable, OnDestroy, signal } from "@angular/core";

export interface MyEvent {
    id: string;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class RootService implements OnDestroy {
    public readonly events = signal<MyEvent[]>([]);

    constructor() {
        console.log(`${RootService.name} is starting...`);
    }

    push(message: string) {
        this.events.update(actual => [...actual, { id: crypto.randomUUID(), message }]);
    }

    ngOnDestroy(): void {
        console.log(`${RootService.name} is dying...`);
    }
}