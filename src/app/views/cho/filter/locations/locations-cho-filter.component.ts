import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter} from '../../../../shared/types/cho/filter/CHOFilter';
import {CHOStatsFilter} from '../../../../shared/types/cho/stats/CHOStatsFilter';
import {COUNTIES} from '../../../../shared/constants/filter.enum';

@Component({
    selector: 'lmap-locations-cho-filter',
    templateUrl: './locations-cho-filter.component.html'
})
export class LocationsChoFilterComponent {
    @Input() filter: CHOFilter | CHOStatsFilter;
    @Input() form: FormGroup;

    COUNTIES = Object.values(COUNTIES);
    LOCALITIES = ['Test 1', 'Test 2'];

    get county() {
        return this.form?.get('county');
    }
}
