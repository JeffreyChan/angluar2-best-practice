import * as _ from 'lodash'
import { Component, Input, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {

    ctrlPageNum: FormControl = new FormControl();

    totalPage: number = 0;
    @Input()
    params: { [key: string]: string | number } = {}

    @Input()
    size: number = 10;

    @Input()
    total: number = 0;

    @Input()
    page: number = 1

    @Output()
    pageClickEvt: EventEmitter<number> = new EventEmitter<number>()

    constructor() { }

    totalPages() {
        return Math.ceil(this.total / this.size)
    }

    rangeStart() {
        return Math.floor(this.page / this.size) * this.size + 1;
    }

    pagesRange() {
        return _.range(this.rangeStart(), Math.min(this.rangeStart() + 10, this.totalPages() + 1))
    }

    prevPage() {
        return Math.max(this.rangeStart(), this.page - 1)
    }

    nextPage() {
        return Math.min(this.page + 1, this.totalPages())
    }

    pageClicked(page: number) {
        this.pageClickEvt.emit(page);
    }
}