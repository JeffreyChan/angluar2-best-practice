import { Component } from '@angular/core';

// AoT compilation doesn't support 'require'.
import './app.component.scss';
import '../../../static/style/app.scss';
import '../../../static/style/loading..scss';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent { }