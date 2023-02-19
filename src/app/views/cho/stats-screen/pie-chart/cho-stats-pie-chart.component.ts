import {Component, Input} from '@angular/core';
import {LegendPosition} from '@swimlane/ngx-charts';
import {Color} from '@swimlane/ngx-charts/lib/utils/color-sets';
import {DataItem} from '@swimlane/ngx-charts/lib/models/chart-data.model';

@Component({
    selector: 'lmap-cho-stats-pie-chart',
    templateUrl: './cho-stats-pie-chart.component.html',
    styleUrls: ['./cho-stats-pie-chart.component.scss'],
})
export class ChoStatsPieChartComponent {
    @Input() dataset: DataItem[] = [];
    @Input() title: string;
    view: [number, number] = [900, 500];

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

    formatPercent = (dataItem: DataItem) => {
        const total = this.dataset.reduce((acc: number, item: DataItem) => {
            return acc + item.value;
        }, 0);

        const value = dataItem.value / total * 100;

        if (value === 100) {
            return '100%';
        }

        return value.toFixed(2) + '%';
    };

    labelFormatting = (name: string) => {
        const dataItem = this.dataset.find((item: DataItem) => item.name === name) as DataItem;
        return `${name} (${this.formatPercent(dataItem)})`;
    };

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
