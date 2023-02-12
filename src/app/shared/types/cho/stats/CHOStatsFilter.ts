import {CHOBaseFilter} from '../filter/CHOBaseFilter';
import {CHOFilterTime} from '../filter/CHOFilterTime';
import {DATE_RANGES} from '../../../constants/filter.enum';

export class CHOStatsFilter extends CHOBaseFilter {
    collectingTime: CHOFilterTime = new CHOFilterTime(DATE_RANGES.CENTURY);
    findingTime: CHOFilterTime = new CHOFilterTime(DATE_RANGES.CENTURY);
    productionTime: CHOFilterTime = new CHOFilterTime(DATE_RANGES.CENTURY);
}
