import {
    CHO_DISPLAY_STATES,
    CHO_TYPES,
    COUNTIES, MEDAL_FORMS,
    NATURE_AGES,
    NATURE_EPOCHS,
    NATURE_SEXES,
    RO_EPOCHS
} from '../../../constants/filter.enum';

export class CHOBaseFilter {
    public county: COUNTIES | null = null;
    public displayState: CHO_DISPLAY_STATES | null = null;
    public epoch: RO_EPOCHS | null = null;
    public inventoryNumber: string | null = null;
    public locality: string | null = null;
    public title: string | null = null;
    public type: CHO_TYPES | null = null;

    // used only for inp-clasate-medalistica-2014-02-02.xml
    public medalFilter: MedalCHOFilter = new MedalCHOFilter();
    // used only for inp-clasate-stiintele-naturii-2014-02-03-7.xml
    public natureFilter: NatureCHOFilter = new NatureCHOFilter();
}

export class NatureCHOFilter {
    public age: NATURE_AGES | null = null;
    public epoch: NATURE_EPOCHS | null = null;
    public sex: NATURE_SEXES | null = null;

    public isEmpty() {
        return this.age === null && this.epoch === null && this.sex === null;
    }
}

export class MedalCHOFilter {
    public shape: MEDAL_FORMS | null = null;

    public isEmpty() {
        return this.shape === null;
    }
}
