import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { User } from '../../../model/user.model';

import { Observable, Subject } from 'rxjs/Rx';

import { UserService } from '../../../services/user.service'


@Component({
    selector: 'who-to-follow',
    templateUrl: 'who-to-follow.component.html',

})

export class WhoToFollowComponent implements OnInit {

    userList: any[] = [];
    userNameCtrl: FormControl = new FormControl();

    errorMessage: string;

    public randomOffset: number;

    private refreshClickStream = new Subject<number>();

    constructor(private _userService: UserService) {

    }

    ngOnInit(): void {

        var responseStream: Observable<any[]> = this.refreshClickStream
            .startWith(this.getRandomOffset())
            .flatMap((params: any) => this._userService.getGitHubUsers(params.since));


        const closeClick1Stream: Observable<string> = Observable.create((observer: any) => {
            this.closeUser1 = () => { observer.next('close1 click'); };
        });

        const closeClick2Stream: Observable<string> = Observable.create((observer: any) => {
            this.closeUser2 = () => { observer.next('close2 click'); };
        });

        const closeClick3Stream: Observable<string> = Observable.create((observer: any) => {
            this.closeUser3 = () => { observer.next('close3 click'); };
        });

        const suggestionStream1 = this.createSuggestionStream(closeClick1Stream, responseStream);
        const suggestionStream2 = this.createSuggestionStream(closeClick2Stream, responseStream);
        const suggestionStream3 = this.createSuggestionStream(closeClick3Stream, responseStream);


        suggestionStream1.subscribe((user: any) => {
            console.log(`user 1 load: ${user}`);
            this.userList[0] = user
        });

        suggestionStream2.subscribe((user: any) => {
            console.log(`user 2 load: ${user}`);
            this.userList[1] = user
        });

        suggestionStream3.subscribe((user: any) => {
            console.log(`user 3 load: ${user}`);
            this.userList[2] = user
        });

    }

    createSuggestionStream(closeClickStream: Observable<string>, responseStream: Observable<any[]>) {
        return closeClickStream.startWith('startup click')
            .combineLatest(responseStream, (closeClick: string, listUsers: any[]) => {
                return listUsers[Math.floor(Math.random() * listUsers.length)];
            }).merge(this.refreshClickStream.mapTo(null))
            .debounceTime(750)
            .distinctUntilChanged()
            .startWith(null);
    }

    getRandomOffset() {
        return Math.floor(Math.random() * 500);
    }

    refreshUser() {
        this.refreshClickStream.next(this.getRandomOffset());
    }

    closeUser1() {

    }

    closeUser2() {

    }

    closeUser3() {

    }
}
