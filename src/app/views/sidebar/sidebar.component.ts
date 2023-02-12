import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';

import {CHOFilter} from '../../shared/types/cho/filter/CHOFilter';

@Component({
    selector: 'lmap-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas
    ) {}

    @Input() filter: CHOFilter;
}
