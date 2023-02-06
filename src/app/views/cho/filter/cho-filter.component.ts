import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveOffcanvas, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {CHOSummaryScreenComponent} from '../summary-screen/cho-summary-screen.component';
import {BackendService} from '../../../shared/services/backend.service';
import {CHOFilter} from '../../../shared/types/cho/CHOFilter';

@Component({
    selector: 'lmap-cho-filter',
    templateUrl: './cho-filter.component.html',
    styleUrls: ['./cho-filter.component.scss']
})
export class CHOFilterComponent implements OnInit {
    totalCHOs$: Observable<number>;

    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private backendService: BackendService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal
    ) {
        this.totalCHOs$ = backendService.totalCHOs$;
    }

    @Input() filter: CHOFilter;

    form: FormGroup;

    createFormControls() {
        return {
            county: new FormControl,
            displayState: new FormControl(),
            endDate: new FormControl(this.filter.creationInterval?.end.date, [
                this.timePeriodValidator('endDate', 'endRange')
            ]),
            endRange: new FormControl(),
            epoch: new FormControl(),
            inventoryNumber: new FormControl(this.filter.inventoryNumber, [
                Validators.minLength(3)
            ]),
            medalShape: new FormControl(),
            natureAge: new FormControl(),
            natureEpoch: new FormControl(),
            natureSex: new FormControl(),
            startDate: new FormControl(this.filter.creationInterval?.start.date, [
                this.timePeriodValidator('startDate', 'startRange')
            ]),
            startRange: new FormControl(),
            title: new FormControl(this.filter.title, [
                Validators.minLength(3)
            ]),
            type: new FormControl()
        };
    }

    timePeriodValidator = (dateName: string, rangeName: string): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const startDate  = this.form?.controls?.[dateName].value;
            const startRange  = this.form?.controls?.[rangeName].value;

            if (!startDate) {
                return null;
            }
            return !startRange
                ? {rangeRequired: {value: !!startRange}}
                : null;
        }
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            this.createFormControls()
        );
    }

    // TODO: form control validation: https://github.com/loiane/angular-reactive-forms-validate-submit/blob/97a7e9ebd834b0913c15a0fc27fe19b2ffe9a05d/src/app/validate-fields-submit-form/validate-fields-submit-form.component.ts#L54
    onSubmit() {
        // this.filter.prepareBackendData();

        this.backendService.museumsSubscription(this.filter);
        this.backendService.choCounterSubscription(this.filter);
    }

    openCHOsModal = () => {
        const modalRef = this.modalService.open(CHOSummaryScreenComponent, {fullscreen: true});
        modalRef.componentInstance.filter = this.filter;
        this.activeOffcanvas.close();
    }
}
