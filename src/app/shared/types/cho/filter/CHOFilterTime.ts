import {DATE_RANGES} from '../../../constants/filter.enum';

export class CHOFilterTime {
    constructor(range?: DATE_RANGES | null) {
        if (range) {
            this.range = range;
        }
    }

    public date: number | null = null;
    public range: DATE_RANGES | null = null;
    public show: boolean = true;

    public isEmpty() {
        return this.date === null && this.range === null;
    }
}
