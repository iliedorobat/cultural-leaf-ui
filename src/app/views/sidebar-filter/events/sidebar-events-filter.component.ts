import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {DATE_RANGES, FilterInterval} from '../SidebarCHOFilter';

@Component({
    selector: 'lmap-sidebar-events-filter',
    templateUrl: './sidebar-events-filter.component.html'
})
export class SidebarEventsFilterComponent {
    @Input() filterInterval: FilterInterval;
    @Input() form: FormGroup;

    DATE_RANGES = Object.values(DATE_RANGES);

    get endDate() {
        return this.form?.get('endDate');
    }

    get endRange() {
        return this.form?.get('endRange');
    }

    get startDate() {
        return this.form?.get('startDate');
    }

    get startRange() {
        return this.form?.get('startRange');
    }
}
