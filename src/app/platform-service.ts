import { Injectable, OnDestroy, signal } from "@angular/core";

interface Event {
    id: string;
    message: string;
}

@Injectable({ providedIn: 'platform' })
export class PlatformService implements OnDestroy {
    public readonly events = signal<Event[]>([]);

    constructor() {
        console.log(`${PlatformService.name} is starting...`);
    }

    push(message: string) {
        this.events.update(actual => [...actual, { id: crypto.randomUUID(), message }]);
    }

    ngOnDestroy(): void {
        console.log(`${PlatformService.name} is dying...`);
    }
}