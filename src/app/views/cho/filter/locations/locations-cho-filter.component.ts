import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter} from '../../../../shared/types/cho/CHOFilter';
import {CHOStatsFilter} from '../../../../shared/types/cho/CHOStatsFilter';
import {COUNTIES} from '../../../../shared/types/cho/filter.const';

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
