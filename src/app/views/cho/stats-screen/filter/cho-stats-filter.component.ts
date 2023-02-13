import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

import {CHOFilterTime} from '../../../../shared/types/cho/filter/CHOFilterTime';
import {CHOStatsFilter} from '../../../../shared/types/cho/stats/CHOStatsFilter';

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
            collectingRange: new FormControl(this.filter.collectingTime.range),
            county: new FormControl,
            displayState: new FormControl(),
            epoch: new FormControl(),
            findingRange: new FormControl(this.filter.findingTime.range),
            inventoryNumber: new FormControl(this.filter.inventoryNumber, [
                Validators.minLength(3)
            ]),
            medalShape: new FormControl(),
            natureAge: new FormControl(),
            natureEpoch: new FormControl(),
            natureSex: new FormControl(),
            productionRange: new FormControl(this.filter.productionTime.range),
            title: new FormControl(this.filter.title, [
                Validators.minLength(3)
            ]),
            type: new FormControl()
        });
    }

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
            case 'production-timespan':
                this.filter.productionTime = new CHOFilterTime();
                break;
            case 'finding-timespan':
                this.filter.findingTime = new CHOFilterTime();
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
