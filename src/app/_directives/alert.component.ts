import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
