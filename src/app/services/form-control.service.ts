import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable()
export class FormControlService {
    constructor() { }

    handleValidations(errorDict: any, validationMessages:any, fg: FormGroup) {
        // avoid mutation
        const fields = Object.assign({}, errorDict);

        for (const field in fields) {
            const control = fg.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    fields[field] += messages[key] + ' ';
                }
            }
        }

        return fields;
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/