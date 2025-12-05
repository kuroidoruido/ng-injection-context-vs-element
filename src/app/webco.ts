import { Component, OnDestroy, signal, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'my-webco',
    template: `<h1>I am a webco! [{{id()}}]</h1>`,
    encapsulation: ViewEncapsulation.ShadowDom
})
export class Webco implements OnDestroy {
    id = signal<number>(++(window as any).webcoCounter);

    constructor() {
        console.log(Webco.name, "I'm alive! 😈");
    }

    ngOnDestroy(): void {
        console.log(Webco.name, 'I was destroyed... 😭');
    }
}