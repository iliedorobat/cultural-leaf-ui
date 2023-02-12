import {CHOBaseFilter} from './CHOBaseFilter';
import {CHOFilterTime} from './CHOFilterTime';

export class CHOFilter extends CHOBaseFilter {
    public collectingInterval: FilterInterval = new FilterInterval();
    public productionInterval: FilterInterval = new FilterInterval();
    public findingInterval: FilterInterval = new FilterInterval();
}

export class FilterInterval {
    public start: CHOFilterTime = new CHOFilterTime();
    public end: CHOFilterTime = new CHOFilterTime();

    public isEmpty() {
        return this.start.isEmpty() && this.end.isEmpty();
    }
}
