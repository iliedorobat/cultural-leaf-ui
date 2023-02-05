import {Component, Input, OnInit} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors, ValidatorFn,
    Validators
} from '@angular/forms';
import {NgbActiveOffcanvas, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {BackendService} from '../../shared/services/backend.service';
import {ChosModalComponent} from '../cho-list-modal/chos-modal.component';
import {SidebarCHOFilter} from './SidebarCHOFilter';

@Component({
    selector: 'lmap-atlas-filter',
    templateUrl: './sidebar-filter.component.html',
    styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {
    constructor(
        private backendService: BackendService,
        public activeOffcanvas: NgbActiveOffcanvas,
        private formBuilder: FormBuilder,
        private modalService: NgbModal
    ) {}

    @Input() filter: SidebarCHOFilter;

    choCounter: number = 0;
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

        this.backendService.choCount$
            .subscribe(counter => {
                this.choCounter = counter.count;
            });
    }

    // TODO: form control validation: https://github.com/loiane/angular-reactive-forms-validate-submit/blob/97a7e9ebd834b0913c15a0fc27fe19b2ffe9a05d/src/app/validate-fields-submit-form/validate-fields-submit-form.component.ts#L54
    onSubmit() {
        // this.filter.prepareBackendData();

        this.backendService.museumsSubscription(this.filter);
        this.backendService.choCounterSubscription(this.filter);
    }

    openCHOsModal = () => {
        const modalRef = this.modalService.open(ChosModalComponent, {fullscreen: true});
        modalRef.componentInstance.filter = this.filter;
    }
}
