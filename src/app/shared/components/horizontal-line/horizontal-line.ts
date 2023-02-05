import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'lmap-horizontal-line',
    templateUrl: './horizontal-line.html',
    styleUrls: ['./horizontal-line.scss']
})
export class HorizontalLineComponent implements OnInit {
    @Input() className: string;
    classes = 'horizontal-separator';

    ngOnInit(): void {
        if (this.className) {
            this.classes += ` ${this.className}`;
        }
    }
}
