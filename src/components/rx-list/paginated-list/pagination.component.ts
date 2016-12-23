import * as _ from 'lodash'
import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Location } from '@angular/common'

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {
    totalPage: number = 0

    @Input()
    params: { [key: string]: string | number } = {}

    @Input()
    total: number = 0

    @Input()
    page: number = 1

    @Output()
    pageClickEvt: EventEmitter<number> = new EventEmitter<number>()

    constructor() { }

    totalPages() {
        return Math.ceil(this.total / 10)
    }

    rangeStart() {
        return Math.floor(this.page / 10) * 10 + 1
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

    pageParams(page: number) {
        let params = _.clone(this.params)
        params['page'] = page
        return params
    }

    pageClicked(page: number) {
        this.pageClickEvt.emit(page);
    }
}