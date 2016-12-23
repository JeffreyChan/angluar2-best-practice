import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { URLSearchParams } from '@angular/http';


@Injectable()
export class FormControlService {
    constructor() { }

    handleValidations(errorDict: any, validationMessages: any, fg: FormGroup) {
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

    toParamsString(params: any): string {
        let urlSearchParams = new URLSearchParams();
        for (let key in params) {
            urlSearchParams.append(key, params[key]);
        };
        return urlSearchParams.toString();
    }
}