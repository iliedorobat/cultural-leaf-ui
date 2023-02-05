import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {SidebarCHOFilter, COUNTIES} from '../SidebarCHOFilter';

@Component({
    selector: 'lmap-sidebar-location-filter',
    templateUrl: './sidebar-locations-filter.component.html'
})
export class SidebarLocationsFilterComponent {
    @Input() filter: SidebarCHOFilter;
    @Input() form: FormGroup;

    COUNTIES = Object.values(COUNTIES);
    LOCALITIES = ['Test 1', 'Test 2'];

    get county() {
        return this.form?.get('county');
    }
}
