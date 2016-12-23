import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'

import { User } from '../../../model/user.model';

import { UserService } from '../../../services/user.service'




@Component({
    selector: 'paginated-list',
    templateUrl: 'paginated-list.component.html',

})

export class PaginatedListComponent implements OnInit {

    //init data
    pageNumList: number[] = [1];

    pageSizeList: number[] = [10, 30, 50, 100];

    gitForm: FormGroup;

    errorMessage: string;

    gitRepStream: Observable<any>;

    totalCount: number;

    gitRepList: any[];

    constructor(private fb: FormBuilder, private _userService: UserService) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    private pageStream = new Subject<number>()

    page: number = 1
    terms: string = ""

    total$: Observable<number>;
    items$: Observable<any[]>;
    buildForm(): void {

        this.gitForm = this.fb.group({
            'searchTerm': [''],
            'pageNum': this.pageNumList[0],
            'pageSize': this.pageSizeList[0]
        });

        const pageSource = this.gitForm.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .flatMap((fmValue: any) => {
                const params = {
                    q: fmValue['searchTerm'],
                    page: fmValue['pageNum'],
                    per_page: fmValue['pageSize']
                };
                this.page = params.page;
                this.terms = params.q;

                return Observable.of(params);
            });

        const source = pageSource.switchMap(this.mapSearchCondition.bind(this)).share();

        this.total$ = source.pluck('total')
        this.items$ = source.pluck('items')


    }

    mapSearchCondition(params: any): any {
        if (params.q) {
            return this._userService.getGitHubRepositories(params)
                .catch((errMsg: string) => {
                    return Observable.of({ items: [], total_count: 0, error: errMsg });
                });
        }
        else {
            return Observable.of({ items: [], total_count: 0 });
        }
    }
}
