import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { User } from '../../../model/user.model';

import { Observable } from 'rxjs/Rx';

import { UserService } from '../../../services/user.service'




@Component({
    selector: 'paginated-list',
    templateUrl: 'paginated-list.component.html',

})

export class PaginatedListComponent implements OnInit {

    //init data
    pageNumList: number[] = [1, 2];

    pageSizeList: number[] = [10, 30, 50, 100];

    gitForm: FormGroup;

    errorMessage: string;

    gitRepStream: Observable<any>;

    totalCount: number;

    gitRepList: any[];

    constructor(private fb: FormBuilder, private _userService: UserService, private _http:Http) {

        this._http
            .get('https://api.github.com/search/repositories?q=ng2&page=1&per_page=10')
            .map((res: Response) => res.json())
            .catch((res: Response) => {
              return Observable.of({items: [], totalCount: 0, error: res.json()});
            })
            .subscribe(d => {
                console.log(d);
            });
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {

        this.gitForm = this.fb.group({
            'searchTerm': [''],
            'pageNum': this.pageNumList[0],
            'pageSize': this.pageSizeList[0]
        });

        this.gitRepStream = this.gitForm.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(this.mapSearchCondition.bind(this))
            .share();

        this.gitRepStream.subscribe(data => {
            this.gitRepList = data.items;
            this.totalCount = data.total_count;
            this.errorMessage = data.error
        });

    }

    mapSearchCondition(formValue: any): any {
        const params = {
            q: formValue['searchTerm'],
            page: formValue['pageNum'],
            per_page: formValue['pageSize']
        };
        if (params.q) {
            return this._userService.getGitHubRepositories(params)
                .catch((res: any) => {
                    return Observable.of({ items: [], total_count: 0, error: res.json() });
                });
        }
        else {
            return Observable.of({ items: [], total_count: 0 });
        }
    }
}
