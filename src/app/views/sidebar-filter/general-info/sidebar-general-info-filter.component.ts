import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {SidebarCHOFilter, CHO_DISPLAY_STATES, CHO_TYPES} from '../SidebarCHOFilter';

@Component({
    selector: 'lmap-sidebar-general-info-filter',
    templateUrl: './sidebar-general-info-filter.component.html'
})
export class SidebarGeneralInfoFilterComponent {
    @Input() filter: SidebarCHOFilter;
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
