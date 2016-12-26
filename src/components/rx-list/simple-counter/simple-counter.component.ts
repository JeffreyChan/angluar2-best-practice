import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'simple-counter',
    templateUrl: 'simple-counter.component.html',

})

export class SimpleCounteromponent implements OnInit {

    count$: Observable<number>;

    constructor() {

    }

    increment() {

    }

    decrement() {

    }

    ngOnInit(): void {
        const incrementClick$ = Observable.create((observer: any) => {
            this.increment = () => { observer.next(); };
        });
        const decrementClick$ = Observable.create((observer: any) => {
            this.decrement = () => { observer.next(); };
        });

        const intent$ = Observable.merge(
            decrementClick$.map(() => -1),
            incrementClick$.map(() => +1)
        );

        this.count$ = intent$
            .startWith(0)
            .scan((currentCount: number, value: number) => currentCount + value);
    }
}
