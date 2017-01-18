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

    pageIndex: number = 1;
    private searchTerms: string = "";
    pageSize: number = this.pageSizeList[0];
    totalSize: number;

    private searchTermStream = new Subject<string>();
    private pageIndexStream = new Subject<number>();


    private searchSouceStream = new Subject<{ q: string, per_page: number }>();


    private pageSizelStream = new Subject<number>();

    totalCount$: Observable<number>;
    gitRepList$: Observable<any[]>;

    constructor(private fb: FormBuilder, private _userService: UserService) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    isLoading: boolean;
    buildForm(): void {

        this.gitForm = this.fb.group({
            'searchTerm': [''],
            'pageSize': this.pageSizeList[0]
        });

        this.gitForm.valueChanges
            .map((fmValue: any) => {
                const params = {
                    q: fmValue['searchTerm'] as string,
                    per_page: fmValue['pageSize'] as number,
                };
                return params;
            })
            .subscribe(params => {
                this.searchSouceStream.next(params);
                this.pageIndexStream.next(1);
            });

        const source = this.searchSouceStream
            .combineLatest(this.pageIndexStream.startWith(this.pageIndex),
            (params: { q: string, per_page: number }, page: number) => {
                return { q: params.q, page: page, per_page: params.per_page };
            })
            .debounceTime(1000)
            .distinctUntilChanged()
            .do(params => {
                this.pageIndex = params.page;
                this.searchTerms = params.q;
                this.pageSize = params.per_page;

                this.isLoading = true;
                console.log(`before loading call time:${Date.now()}`);
            })
            .switchMap((this.mapSearchCondition.bind(this)))
            .share();

        this.gitRepList$ = source.pluck('items');
        this.totalCount$ = source.pluck('total_count');

        source.subscribe((data: any) => {
            this.errorMessage = data.error;
            this.totalSize = data.total_count;
            this.isLoading = false;
            console.log(`after loading call time:${Date.now()}`);
        });
    }

    mapSearchCondition(params: any): any {
        console.log(`pageIndex:${params.page}    pageSzie:${params.per_page}`);
        if (params.q && params.q.length > 2) {
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
        this.pageIndexStream.next(page)
    }
}
