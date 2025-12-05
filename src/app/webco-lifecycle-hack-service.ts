import { Injectable, OnDestroy, inject, ApplicationRef, ElementRef, Injector, InjectionToken, Provider, Type } from "@angular/core";

export interface NeedToBeResetOnWeboDestroy {
    resetOnWebcoDetroy(): void;
}

export const NeedToBeResetOnWeboDestroy = new InjectionToken<NeedToBeResetOnWeboDestroy[]>('HACK_NEED_TO_BE_DESTROYED');

export function resetableOnWebcoDestroy<T extends Type<any>>(...resetables: T[]): Provider[] {
    return resetables.flatMap(s => [
        { provide: s, useClass: s },
        { provide: NeedToBeResetOnWeboDestroy, useFactory: () => inject(s), multi: true }
    ])
}

@Injectable()
export class WebcomponentLifecycleHackService {
    private readonly elementRef = inject(ElementRef);
    private readonly injector = inject(Injector);
    destroy(): void {
        const elementInstance = this.elementRef.nativeElement as HTMLElement & { ngElementStrategy: any };
        elementInstance.remove();
        elementInstance.ngElementStrategy.scheduledDestroyFn()
        elementInstance.ngElementStrategy.scheduledDestroyFn = null;
        console.log({ injector: this.injector })
        this.injector.get(NeedToBeResetOnWeboDestroy).forEach(s => {
            s.resetOnWebcoDetroy();
        });
    }
}