import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Person } from '../../../model/person.model';
import { FormControlService } from '../../../services/form-control.service';

@Component({
    selector: 'person-component',
    templateUrl: 'person.component.html'
})

export class PersonComponent implements OnInit {

    public genders = [
        { value: 'F', display: 'Female' },
        { value: 'M', display: 'Male' }
    ];
    public roles = [
        { value: 'admin', display: 'Administrator' },
        { value: 'guest', display: 'Guest' },
        { value: 'custom', display: 'Custom' }
    ];

    public themes = [
        { backgroundColor: 'black', fontColor: 'white', display: 'Dark' },
        { backgroundColor: 'white', fontColor: 'black', display: 'Light' },
        { backgroundColor: 'grey', fontColor: 'white', display: 'Sleek' }
    ];

    public topics = [
        { value: 'game', display: 'Gaming' },
        { value: 'tech', display: 'Technology' },
        { value: 'life', display: 'Lifestyle' },
    ];

    public toggles = [
        { value: 'toggled', display: 'Toggled' },
        { value: 'untoggled', display: 'UnToggled' },
    ];

    public personForm: FormGroup;

    public txtToggle: FormControl;

    public person: Person = new Person(0, '', '', 0);

    public submitted = false;

     public formErrors: any = {};

    public validationMessages: any = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
        },
        'email': {
            'required': 'Email Address is required.'
        },
        'age': {
            'required': 'Age is required.'
        }
    };

    constructor(private fb: FormBuilder, private _formService: FormControlService) {

    }

    ngOnInit(): void {
        this.buildForm();
    }

    onSubmit() {
        this.submitted = true;
        this.person = this.personForm.value;
    }

    buildForm(): void {
        this.personForm = this.fb.group({
            'name': [this.person.PersonName, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)]
            ],
            'email': [this.person.Email, Validators.required],
            'age': [this.person.Age, Validators.required],
            'gender': [''],
            'role': [this.roles[0].value],
            'theme': this.themes[0],
            'isActive': [false],
            'toggle': this.toggles[1].value,
            'topics': [this.topics[1].value]
        });

        this.txtToggle = this.personForm.get('toggle') as FormControl;
        this.personForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    private onValueChanged(data?: any) {
        if (!this.person) { return; }
        // handle main form errors
        this.onFormValueChanged();
    }

    /* Update Main Form Validations */
    private onFormValueChanged() {
        const personF = this.personForm;
        // setup fields to validate and the messages
        const fields = {
            'name': '',
            'email': '',
            'age': ''
        };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, personF);
        this.formErrors = Object.assign(this.formErrors, refErrors);
    }
}
