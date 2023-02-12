import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveOffcanvas, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';

import {BackendService} from '../../../../shared/services/backend.service';
import {CHOFilter, FilterInterval} from '../../../../shared/types/cho/filter/CHOFilter';
import {CHOSummaryScreenComponent} from '../cho-summary-screen.component';
import {CHOStatsScreenComponent} from '../../stats-screen/cho-stats-screen.component';
import {FilterUtils} from '../../stats-screen/filter/filter.utils';
import {TableService} from '../../../../shared/components/table/table.service';

@Component({
    selector: 'lmap-cho-summary-filter',
    templateUrl: './cho-summary-filter.component.html',
    styleUrls: ['../../filter/filter.scss']
})
export class CHOSummaryFilterComponent implements OnInit {
    totalCHOs$: Observable<number>;
    counterClickable = true;

    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private backendService: BackendService,
        private modalService: NgbModal,
        public tableService: TableService
    ) {
        this.totalCHOs$ = backendService.totalCHOs$;

        this.modalService.activeInstances
            .subscribe(openedModals => {
                for (const modalInstance of openedModals) {
                    if (modalInstance.componentInstance instanceof CHOSummaryScreenComponent) {
                        this.counterClickable = false;
                        break;
                    }
                }
            });
    }

    @Input() filter: CHOFilter;
    @Input() onFilterApply: Function;

    form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            county: new FormControl,
            displayState: new FormControl(),
            creationEndDate: new FormControl(this.filter.creationInterval?.end.date, [
                this.timePeriodNumberValidator('creationEndDate'),
                this.timePeriodValidator('creationEndDate', 'creationEndRange'),
                this.timePeriodIntervalValidator('creationStartDate', 'creationEndDate')
            ]),
            creationEndRange: new FormControl(this.filter.creationInterval?.end.range, [
                this.timePeriodRangeValidator('creationStartRange', 'creationEndRange')
            ]),
            creationStartDate: new FormControl(this.filter.creationInterval?.start.date, [
                this.timePeriodNumberValidator('creationStartDate'),
                this.timePeriodValidator('creationStartDate', 'creationStartRange'),
                this.timePeriodIntervalValidator('creationStartDate', 'creationEndDate')
            ]),
            creationStartRange: new FormControl(this.filter.creationInterval?.start.range, [
                this.timePeriodRangeValidator('creationStartRange', 'creationEndRange')
            ]),
            epoch: new FormControl(),
            foundEndDate: new FormControl(this.filter.foundInterval?.end.date, [
                this.timePeriodNumberValidator('foundEndDate'),
                this.timePeriodValidator('foundEndDate', 'foundEndRange'),
                this.timePeriodIntervalValidator('foundStartDate', 'foundEndDate')
            ]),
            foundEndRange: new FormControl(this.filter.foundInterval?.end.range, [
                this.timePeriodRangeValidator('foundStartRange', 'foundEndRange')
            ]),
            foundStartDate: new FormControl(this.filter.foundInterval?.start.date, [
                this.timePeriodNumberValidator('foundStartDate'),
                this.timePeriodValidator('foundStartDate', 'foundStartRange'),
                this.timePeriodIntervalValidator('foundStartDate', 'foundEndDate')
            ]),
            foundStartRange: new FormControl(this.filter.foundInterval?.start.range, [
                this.timePeriodRangeValidator('foundStartRange', 'foundEndRange')
            ]),
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

    timePeriodRangeValidator = (startRangeName: string, endRangeName: string) => {
        return (control: AbstractControl): ValidationErrors | null => {
            const startRange  = this.form?.controls?.[startRangeName].value;
            const endRange  = this.form?.controls?.[endRangeName].value;

            if (startRange && endRange) {
                if (startRange !== endRange) {
                    return {
                        invalidTimeRange: {
                            error: 'The range of the start & end edges should be sa same!',
                            value: {
                                startRange,
                                endRange
                            }
                        }
                    };
                }
            }

            return null;
        };
    };

    timePeriodIntervalValidator = (startDateName: string, endDateName: string) => {
        return (control: AbstractControl): ValidationErrors | null => {
            const startDate  = this.form?.controls?.[startDateName].value;
            const endDate  = this.form?.controls?.[endDateName].value;

            if (startDate && endDate) {
                if (startDate > endDate) {
                    return {
                        invalidTimeInterval: {
                            error: 'The end of the interval cannot be lower than the start!',
                            value: {
                                startDate,
                                endDate
                            }
                        }
                    };
                }
            }

            return null;
        };
    };

    timePeriodNumberValidator = (dateName: string) => {
        return (control: AbstractControl): ValidationErrors | null => {
            const date  = this.form?.controls?.[dateName].value;

            if (date === 0) {
                return {
                    invalidTimePeriod: {
                        error: 'Time period cannot be 0!',
                        value: date
                    }
                };
            }

            return null;
        };
    };

    timePeriodValidator = (dateName: string, rangeName: string): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const date  = this.form?.controls?.[dateName].value;
            const range  = this.form?.controls?.[rangeName].value;

            if (!date && !range) {
                return null;
            }

            if (!date) {
                return {
                    startDateRequired: {
                        error: 'The date is required!',
                        value: date
                    }
                };
            }

            if (!range) {
                return {
                    rangeRequired: {
                        error: 'The range is required!',
                        value: range
                    }
                };
            }

            return null;
        }
    };

    isMedalFilterTouched = FilterUtils.isMedalFilterTouched;

    isNatureFilterTouched = FilterUtils.isNatureFilterTouched;

    // TODO: form control validation: https://github.com/loiane/angular-reactive-forms-validate-submit/blob/97a7e9ebd834b0913c15a0fc27fe19b2ffe9a05d/src/app/validate-fields-submit-form/validate-fields-submit-form.component.ts#L54
    onSubmit() {
        this.backendService.museumsSummariesSubscription(this.filter);
        this.backendService.choCounterSubscription(this.filter);

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
                this.filter.creationInterval = new FilterInterval();
                break;
            case 'finding-period':
                this.filter.foundInterval = new FilterInterval();
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

    openCHOsModal = () => {
        if (!this.counterClickable) {
            return;
        }

        const modalRef = this.modalService.open(CHOSummaryScreenComponent, {fullscreen: true});
        modalRef.componentInstance.filter = this.filter;
        this.activeOffcanvas.close();

        this.backendService.chosSummaries$
            .subscribe(summaries => {
                this.tableService.rawData = summaries;
            });
    }
}
