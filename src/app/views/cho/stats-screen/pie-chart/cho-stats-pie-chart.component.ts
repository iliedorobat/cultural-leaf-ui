import {Component, Input} from '@angular/core';
import {LegendPosition} from '@swimlane/ngx-charts';
import {Color} from '@swimlane/ngx-charts/lib/utils/color-sets';

import {CHOEventStatsEntry} from '../../../../shared/types/cho/stats/CHOEventStats';

@Component({
    selector: 'lmap-cho-stats-pie-chart',
    templateUrl: './cho-stats-pie-chart.component.html',
    styleUrls: ['./cho-stats-pie-chart.component.scss'],
})
export class ChoStatsPieChartComponent {
    @Input() dataset: CHOEventStatsEntry[] = [];
    @Input() title: string;
    view: [number, number] = [800, 500];

    // options
    @Input() colors: Color = {
        domain: [
            '#913267', '#70B6C2', '#2596BE', '#6D88D2',
            '#9B739C', '#7B8CB6', '#A0C6E8', '#39A1C2',
            '#96AAC3', '#A04667', '#C6C7CA'
        ]
    } as Color;
    @Input() gradient: boolean = true;
    isDoughnut: boolean = false;
    @Input() legendPosition: LegendPosition = 'right' as LegendPosition;
    @Input() showLabels: boolean = false;
    @Input() showLegend: boolean = true;

    onSelect(data: any): void {
        // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data: any): void {
        // console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data: any): void {
        // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
}
