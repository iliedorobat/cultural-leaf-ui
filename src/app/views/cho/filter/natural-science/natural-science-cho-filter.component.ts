import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter, NATURE_AGES, NATURE_EPOCHS, NATURE_SEXES} from '../../../../shared/types/cho/CHOFilter';

@Component({
    selector: 'lmap-natural-science-cho-filter',
    templateUrl: './natural-science-cho-filter.component.html'
})
export class NaturalScienceChoFilterComponent {
    @Input() filter: CHOFilter;
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