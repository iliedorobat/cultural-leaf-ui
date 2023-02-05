import {Component, Input} from '@angular/core';

@Component({
    selector: 'lmap-section-pane',
    templateUrl: './section-pane.component.html',
    styleUrls: ['./section-pane.component.scss']
})
export class SectionPaneComponent {
    @Input() title: string;
}
