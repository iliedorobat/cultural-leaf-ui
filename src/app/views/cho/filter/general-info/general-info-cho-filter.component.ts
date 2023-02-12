import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter} from '../../../../shared/types/cho/CHOFilter';
import {CHOStatsFilter} from '../../../../shared/types/cho/CHOStatsFilter';
import {CHO_DISPLAY_STATES, CHO_TYPES} from '../../../../shared/types/cho/filter.const';

@Component({
    selector: 'lmap-general-info-cho-filter',
    templateUrl: './general-info-cho-filter.component.html'
})
export class GeneralInfoChoFilterComponent {
    @Input() filter: CHOFilter | CHOStatsFilter;
    @Input() form: FormGroup;

    CHO_DISPLAY_STATES = Object.values(CHO_DISPLAY_STATES);
    CHO_TYPES = Object.values(CHO_TYPES);

    get displayState() {
        return this.form?.get('displayState');
    }

    get inventoryNumber() {
        return this.form?.get('inventoryNumber');
    }

    get title() {
        return this.form?.get('title');
    }

    get type() {
        return this.form?.get('type');
    }
}
