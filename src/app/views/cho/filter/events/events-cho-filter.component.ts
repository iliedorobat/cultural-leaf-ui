import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {DATE_RANGES, FilterInterval} from '../../../../shared/types/cho/CHOFilter';

@Component({
    selector: 'lmap-events-cho-filter',
    templateUrl: './events-cho-filter.component.html'
})
export class EventsChoFilterComponent {
    @Input() filterInterval: FilterInterval;
    @Input() form: FormGroup;
    @Input() formControlPrefix: string;

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
