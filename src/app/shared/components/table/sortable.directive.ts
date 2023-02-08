import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {CHOSummary} from '../../types/cho/CHOSummary';

export type SortColumn = keyof CHOSummary | ''; // TODO:
export type SortDirection = 'asc' | 'desc' | '';

const rotate: {
    [key: string]: SortDirection
} = {
    asc: 'desc',
    desc: '',
    '': 'asc'
};

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortable]',
    standalone: true,
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()',
    }
})
export class SortableHeader implements OnInit {
    @Input() sortable: SortColumn = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({
            column: this.sortable,
            direction: this.direction
        });
    }

    ngOnInit(): void {
        console.log('directive:', this);
    }
}