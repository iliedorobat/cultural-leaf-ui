import {DataItem} from '@swimlane/ngx-charts/lib/models/chart-data.model';

import {EVENT_TYPE} from '../../../constants/entity.enum';
import {DATE_RANGES} from '../../../constants/filter.enum';

export interface CHOEventStats {
    entries: DataItem[];
    eventType: EVENT_TYPE;
    timespanType: DATE_RANGES; // TODO: TIMESPAN_TYPE
}
