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
            collectingEndDate: new FormControl(this.filter.collectingInterval?.end.date, [
                this.timePeriodNumberValidator('collectingEndDate'),
                this.timePeriodValidator('collectingEndDate', 'collectingEndRange'),
                this.timePeriodIntervalValidator('collectingStartDate', 'collectingEndDate')
            ]),
            collectingEndRange: new FormControl(this.filter.collectingInterval?.end.range, [
                this.timePeriodRangeValidator('collectingStartRange', 'collectingEndRange')
            ]),
            collectingStartDate: new FormControl(this.filter.collectingInterval?.start.date, [
                this.timePeriodNumberValidator('collectingStartDate'),
                this.timePeriodValidator('collectingStartDate', 'collectingStartRange'),
                this.timePeriodIntervalValidator('collectingStartDate', 'collectingEndDate')
            ]),
            collectingStartRange: new FormControl(this.filter.collectingInterval?.start.range, [
                this.timePeriodRangeValidator('collectingStartRange', 'collectingEndRange')
            ]),
            epoch: new FormControl(),
            findingEndDate: new FormControl(this.filter.findingInterval?.end.date, [
                this.timePeriodNumberValidator('findingEndDate'),
                this.timePeriodValidator('findingEndDate', 'findingEndRange'),
                this.timePeriodIntervalValidator('findingStartDate', 'findingEndDate')
            ]),
            findingEndRange: new FormControl(this.filter.findingInterval?.end.range, [
                this.timePeriodRangeValidator('findingStartRange', 'findingEndRange')
            ]),
            findingStartDate: new FormControl(this.filter.findingInterval?.start.date, [
                this.timePeriodNumberValidator('findingStartDate'),
                this.timePeriodValidator('findingStartDate', 'findingStartRange'),
                this.timePeriodIntervalValidator('findingStartDate', 'findingEndDate')
            ]),
            findingStartRange: new FormControl(this.filter.findingInterval?.start.range, [
                this.timePeriodRangeValidator('findingStartRange', 'findingEndRange')
            ]),
            inventoryNumber: new FormControl(this.filter.inventoryNumber, [
                Validators.minLength(3)
            ]),
            medalShape: new FormControl(),
            natureAge: new FormControl(),
            natureEpoch: new FormControl(),
            natureSex: new FormControl(),
            productionEndDate: new FormControl(this.filter.productionInterval?.end.date, [
                this.timePeriodNumberValidator('productionEndDate'),
                this.timePeriodValidator('productionEndDate', 'productionEndRange'),
                this.timePeriodIntervalValidator('productionStartDate', 'productionEndDate')
            ]),
            productionEndRange: new FormControl(this.filter.productionInterval?.end.range, [
                this.timePeriodRangeValidator('productionStartRange', 'productionEndRange')
            ]),
            productionStartDate: new FormControl(this.filter.productionInterval?.start.date, [
                this.timePeriodNumberValidator('productionStartDate'),
                this.timePeriodValidator('productionStartDate', 'productionStartRange'),
                this.timePeriodIntervalValidator('productionStartDate', 'productionEndDate')
            ]),
            productionStartRange: new FormControl(this.filter.productionInterval?.start.range, [
                this.timePeriodRangeValidator('productionStartRange', 'productionEndRange')
            ]),
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
            case 'collecting-timespan':
                this.filter.collectingInterval = new FilterInterval();
                break;
            case 'finding-timespan':
                this.filter.findingInterval = new FilterInterval();
                break;
            case 'production-timespan':
                this.filter.productionInterval = new FilterInterval();
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
