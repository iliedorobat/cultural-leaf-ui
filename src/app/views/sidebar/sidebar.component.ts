import {Component, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';

import {CHOFilter} from '../../shared/types/cho/filter/CHOFilter';
import {MuseumService} from '../../shared/services/museum.service';

@Component({
    selector: 'lmap-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private museumService: MuseumService
    ) {
        this.museumService.setIsShowAllVisible(true);
    }

    @Input() filter: CHOFilter;
    @Input() resetActiveButtonId: Function;

    onSidebarClose = () => {
        this.activeOffcanvas.dismiss('Cross click');
        this.resetActiveButtonId();
    };
}
