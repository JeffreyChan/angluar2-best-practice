
import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'extended-input',
    templateUrl: 'extended-input.component.html'
})
export class ExtendedInputComponent {

    @Input()
    labelText: string = '';


    @Input()
    errorMessage: string = '';
}