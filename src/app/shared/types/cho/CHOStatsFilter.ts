import {CHOBaseFilter} from './CHOBaseFilter';
import {DATE_RANGES} from './filter.const';
import {CHOFilterTime} from './CHOFilterTime';

export class CHOStatsFilter extends CHOBaseFilter {
    creationTime: CHOFilterTime = new CHOFilterTime(DATE_RANGES.CENTURY);
    foundTime: CHOFilterTime = new CHOFilterTime(DATE_RANGES.CENTURY);
}
