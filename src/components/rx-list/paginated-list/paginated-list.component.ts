import { Component, OnInit } from '@angular/core';

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

        this.gitRepStream.subscribe((data: any) => {
            if (Object.keys(data.items).length > 0) {
                const tempList: any[] = data.items;

                this.gitRepList = Object.assign(tempList, data.items);

                this.totalCount = data.total_count;
                this.errorMessage = data.error;

                const ctrlPageNum = this.gitForm.get('pageNum') as FormControl;
                const ctrlPageSize = this.gitForm.get('pageSize') as FormControl;

                const tmpPageSize = ctrlPageSize.value as number;
                const totalPage = Math.round((this.totalCount + tmpPageSize - 1) / tmpPageSize);
                const tempPageNums: number[] = [1];
                Observable.range(2, totalPage)
                    .subscribe(
                    d => tempPageNums.push(d));
                this.pageNumList = tempPageNums;

                console.log(`pageNum is:${tmpPageSize} || pageIndex is ${ctrlPageNum.value}`);
            }
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
                .catch((errMsg: string) => {
                    return Observable.of({ items: [], total_count: 0, error: errMsg });
                });
        }
        else {
            return Observable.of({ items: [], total_count: 0 });
        }
    }
}
