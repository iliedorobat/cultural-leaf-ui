import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter} from '../../../../shared/types/cho/CHOFilter';
import {CHOStatsFilter} from '../../../../shared/types/cho/CHOStatsFilter';
import {MEDAL_FORMS} from '../../../../shared/types/cho/filter.const';

@Component({
    selector: 'lmap-medal-cho-filter',
    templateUrl: './medal-cho-filter.component.html'
})
export class MedalChoFilterComponent {
    @Input() filter: CHOFilter | CHOStatsFilter;
    @Input() form: FormGroup;

    MEDAL_FORMS = Object.values(MEDAL_FORMS);

    get medalShape() {
        return this.form?.get('medalShape');
    }
}
