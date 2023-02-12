import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

import {CHOFilterTime} from '../../../../shared/types/cho/filter/CHOFilterTime';
import {CHOStatsFilter} from '../../../../shared/types/cho/stats/CHOStatsFilter';
import {FilterUtils} from './filter.utils';

@Component({
    selector: 'lmap-cho-stats-filter',
    templateUrl: './cho-stats-filter.component.html',
    styleUrls: ['../../filter/filter.scss']
})
export class ChoStatsFilterComponent implements OnInit {
    @Input() filter: CHOStatsFilter;
    @Input() onFilterApply: Function;

    form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            county: new FormControl,
            creationRange: new FormControl(this.filter.creationTime.range),
            displayState: new FormControl(),
            epoch: new FormControl(),
            foundRange: new FormControl(this.filter.foundTime.range),
            inventoryNumber: new FormControl(this.filter.inventoryNumber, [
                Validators.minLength(3)
            ]),
            medalShape: new FormControl(),
            natureAge: new FormControl(),
            natureEpoch: new FormControl(),
            natureSex: new FormControl(),
            title: new FormControl(this.filter.title, [
                Validators.minLength(3)
            ]),
            type: new FormControl()
        });
    }

    isMedalFilterTouched = FilterUtils.isMedalFilterTouched;

    isNatureFilterTouched = FilterUtils.isNatureFilterTouched;

    onSubmit() {
        this.onFilterApply && this.onFilterApply();
    }

    onSectionReset(event: Event) {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const value = _.get(target, ['offsetParent', 'attributes', 'aria-controls', 'value']);


        switch (value) {
            case 'general-info-filter':
                this.filter.title = null;
                this.filter.inventoryNumber = null;
                this.filter.displayState = null;
                this.filter.type = null;
                break;
            case 'current-location':
                this.filter.county = null;
                break;
            case 'creation-period':
                this.filter.creationTime = new CHOFilterTime();
                break;
            case 'finding-period':
                this.filter.foundTime = new CHOFilterTime();
                break;
            case 'medal-filter':
                this.filter.medalFilter.shape = null;
                break;
            case 'natural-science-filter':
                this.filter.natureFilter.age = null;
                this.filter.natureFilter.epoch = null;
                this.filter.natureFilter.sex = null;
                break;
            default:
                break;
        }
    }
}
