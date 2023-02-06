import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter, MEDAL_FORMS} from '../../../../shared/types/cho/CHOFilter';

@Component({
    selector: 'lmap-medal-cho-filter',
    templateUrl: './medal-cho-filter.component.html'
})
export class MedalChoFilterComponent {
    @Input() filter: CHOFilter;
    @Input() form: FormGroup;

    MEDAL_FORMS = Object.values(MEDAL_FORMS);

    get medalShape() {
        return this.form?.get('medalShape');
    }
}
