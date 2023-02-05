import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {SidebarCHOFilter, NATURE_AGES, NATURE_EPOCHS, NATURE_SEXES} from '../SidebarCHOFilter';

@Component({
    selector: 'lmap-sidebar-natural-science-filter',
    templateUrl: './sidebar-natural-science-filter.component.html'
})
export class SidebarNaturalScienceFilterComponent {
    @Input() filter: SidebarCHOFilter;
    @Input() form: FormGroup;

    NATURE_AGES = Object.values(NATURE_AGES);
    NATURE_EPOCHS = Object.values(NATURE_EPOCHS);
    NATURE_SEXES = Object.values(NATURE_SEXES);

    get natureAge() {
        return this.form?.get('natureAge');
    }

    get natureEpoch() {
        return this.form?.get('natureEpoch');
    }

    get natureSex() {
        return this.form?.get('natureSex');
    }
}
