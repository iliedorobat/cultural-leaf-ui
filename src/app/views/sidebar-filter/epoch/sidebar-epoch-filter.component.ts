import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {SidebarCHOFilter, RO_EPOCHS} from '../SidebarCHOFilter';

@Component({
    selector: 'lmap-sidebar-epoch-filter',
    templateUrl: './sidebar-epoch-filter.component.html'
})
export class SidebarEpochFilterComponent {
    @Input() filter: SidebarCHOFilter;
    @Input() form: FormGroup;

    RO_EPOCHS = Object.values(RO_EPOCHS);

    get epoch() {
        return this.form?.get('epoch');
    }
}
