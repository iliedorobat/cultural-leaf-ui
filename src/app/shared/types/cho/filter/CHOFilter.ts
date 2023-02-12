import {CHOBaseFilter} from './CHOBaseFilter';
import {CHOFilterTime} from './CHOFilterTime';

export class CHOFilter extends CHOBaseFilter {
    public creationInterval: FilterInterval = new FilterInterval();
    public foundInterval: FilterInterval = new FilterInterval();
}

export class FilterInterval {
    public start: CHOFilterTime = new CHOFilterTime();
    public end: CHOFilterTime = new CHOFilterTime();

    public isEmpty() {
        return this.start.isEmpty() && this.end.isEmpty();
    }
}
