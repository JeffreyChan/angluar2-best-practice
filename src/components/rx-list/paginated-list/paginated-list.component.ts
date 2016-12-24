import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'

import { User } from '../../../model/user.model';

import { UserService } from '../../../services/user.service'

import * as _ from 'lodash';




@Component({
    selector: 'paginated-list',
    templateUrl: 'paginated-list.component.html',

})

export class PaginatedListComponent implements OnInit {

    //init data
    pageSizeList: number[] = [10, 30, 50, 100];

    gitForm: FormGroup;

    errorMessage: string;

    private pageIndex: number = 1;
    private searchTerms: string = "";
    private pageSize: number = this.pageSizeList[0];
    totalSize: number;

    private searchTermStream = new Subject<string>();
    private pageIndexStream = new Subject<number>();
    private pageSizelStream = new Subject<number>();

    totalCount$: Observable<number>;
    gitRepList$: Observable<any[]>;

    constructor(private fb: FormBuilder, private _userService: UserService) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    hasData: boolean;
    buildForm(): void {

        this.gitForm = this.fb.group({
            'searchTerm': [''],
            'pageSize': this.pageSizeList[0]
        });

        this.gitForm.valueChanges
            .debounceTime(600)
            .distinctUntilChanged()
            .map((fmValue: any) => {
                const params = {
                    q: fmValue['searchTerm'] as string,
                    page: this.pageIndex,
                    per_page: fmValue['pageSize'] as number,
                };
                return params;
            })
            .subscribe(params => {
                this.pageIndex = params.page;
                this.searchTerms = params.q;
                this.pageSize = params.per_page;

                this.searchTermStream.next(params.q);
                this.pageSizelStream.next(params.per_page);
            });

        const source = this.searchTermStream.startWith(this.searchTerms)
            .combineLatest(this.pageIndexStream.startWith(this.pageIndex),
            this.pageSizelStream.startWith(this.pageSize),
            (q: string, page: number, per_page: number) => {
                return { q, page, per_page };
            })
            .switchMap((this.mapSearchCondition.bind(this)))
            .share();

        this.gitRepList$ = source.pluck('items');
        this.totalCount$ = source.pluck('total_count');

        /*this.totalCount$.subscribe(totalSize => {
            this.totalSize = totalSize;
        });*/
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

    pageHandler(page: number) {
        this.pageIndex = page;
        this.pageIndexStream.next(page)
    }
}
