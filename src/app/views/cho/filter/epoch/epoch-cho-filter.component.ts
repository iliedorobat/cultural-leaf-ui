import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter} from '../../../../shared/types/cho/filter/CHOFilter';
import {CHOStatsFilter} from '../../../../shared/types/cho/stats/CHOStatsFilter';
import {RO_EPOCHS} from '../../../../shared/constants/filter.enum';

@Component({
    selector: 'lmap-epoch-cho-filter',
    templateUrl: './epoch-cho-filter.component.html'
})
export class EpochChoFilterComponent {
    @Input() filter: CHOFilter | CHOStatsFilter;
    @Input() form: FormGroup;

    RO_EPOCHS = Object.values(RO_EPOCHS);

    get epoch() {
        return this.form?.get('epoch');
    }
}
