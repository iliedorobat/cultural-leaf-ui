import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {FilterInterval} from '../../../../shared/types/cho/CHOFilter';
import {DATE_RANGES} from '../../../../shared/types/cho/filter.const';

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
        return this.form?.get(this.formControlPrefix + 'EndDate');
    }

    get endRange() {
        return this.form?.get(this.formControlPrefix + 'EndRange');
    }

    get startDate() {
        return this.form?.get(this.formControlPrefix + 'StartDate');
    }

    get startRange() {
        return this.form?.get(this.formControlPrefix + 'StartRange');
    }
}
