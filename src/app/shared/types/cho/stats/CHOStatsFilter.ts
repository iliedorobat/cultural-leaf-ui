import {CHOBaseFilter} from '../filter/CHOBaseFilter';
import {CHOFilterTime} from '../filter/CHOFilterTime';
import {DATE_RANGES} from '../../../constants/filter.enum';

export class CHOStatsFilter extends CHOBaseFilter {
    creationTime: CHOFilterTime = new CHOFilterTime(DATE_RANGES.CENTURY);
    foundTime: CHOFilterTime = new CHOFilterTime(DATE_RANGES.CENTURY);
}
