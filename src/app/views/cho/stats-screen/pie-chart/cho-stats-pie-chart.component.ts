import {Component, Input} from '@angular/core';
import {LegendPosition} from '@swimlane/ngx-charts';
import {Color} from '@swimlane/ngx-charts/lib/utils/color-sets';

@Component({
    selector: 'lmap-cho-stats-pie-chart',
    templateUrl: './cho-stats-pie-chart.component.html',
    styleUrls: ['./cho-stats-pie-chart.component.scss'],
})
export class ChoStatsPieChartComponent {
    // TODO:
    @Input() dataset: any[] = [];
    @Input() title: string;
    view: [number, number] = [800, 500];

    // options
    @Input() colorScheme: Color = { // TODO:
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    } as Color;
    gradient: boolean = true;
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
