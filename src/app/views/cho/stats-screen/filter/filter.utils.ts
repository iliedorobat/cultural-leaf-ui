import {MedalCHOFilter, NatureCHOFilter} from '../../../../shared/types/cho/filter/CHOBaseFilter';

export class FilterUtils {
    public static isMedalFilterTouched = (medalFilter: MedalCHOFilter) => {
        return !!medalFilter.shape;
    };

    public static isNatureFilterTouched = (natureFilter: NatureCHOFilter) => {
        return !!(natureFilter.age || natureFilter.epoch || natureFilter.sex);
    };
}
