import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CHOFilter} from '../../../../shared/types/cho/filter/CHOFilter';
import {CHOStatsFilter} from '../../../../shared/types/cho/stats/CHOStatsFilter';
import {MuseumService} from '../../../../shared/services/museum.service';

import {CHO_DISPLAY_STATES, CHO_TYPES} from '../../../../shared/constants/filter.enum';

@Component({
    selector: 'lmap-general-info-cho-filter',
    templateUrl: './general-info-cho-filter.component.html'
})
export class GeneralInfoChoFilterComponent {
    constructor(public museumService: MuseumService) {}

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
