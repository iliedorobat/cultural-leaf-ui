import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {DATE_RANGES} from '../../../../../shared/types/cho/filter.const';
import {CHOFilterTime} from '../../../../../shared/types/cho/CHOFilterTime';

@Component({
    selector: 'lmap-events-cho-stats-filter',
    templateUrl: './events-cho-stats-filter.component.html'
})
export class EventsChoStatsFilterComponent {
    @Input() filterRange: CHOFilterTime;
    @Input() form: FormGroup;
    @Input() formControlPrefix: string;

    DATE_RANGES = Object.values(DATE_RANGES);

    onCheckChanges = () => {
        this.filterRange.show = !this.filterRange.show;
    };

    get range() {
        return this.form?.get(this.formControlPrefix + 'Range');
    }
}
