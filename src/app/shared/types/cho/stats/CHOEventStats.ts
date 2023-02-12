import {EVENT_TYPE} from '../../../constants/entity.enum';
import {DATE_RANGES, TIMESPAN_TYPE} from '../../../constants/filter.enum';

export interface CHOEventStats {
    entries: CHOEventStatsEntry[];
    eventType: EVENT_TYPE;
    timespanType: DATE_RANGES; // TODO: TIMESPAN_TYPE
}

export interface CHOEventStatsEntry {
    name: string;
    value: number;
}
