import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {SidebarCHOFilter, MEDAL_FORMS} from '../SidebarCHOFilter';

@Component({
    selector: 'lmap-sidebar-medal-filter',
    templateUrl: './sidebar-medal-filter.component.html'
})
export class SidebarMedalFilterComponent {
    @Input() filter: SidebarCHOFilter;
    @Input() form: FormGroup;

    MEDAL_FORMS = Object.values(MEDAL_FORMS);

    get medalShape() {
        return this.form?.get('medalShape');
    }
}
