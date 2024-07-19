import {Component} from '@angular/core';

type DisplayName = 'chart1' | 'chart2' | 'chart3' | 'empty';

@Component({
    selector: 'app-analysis-charts-view',
    templateUrl: './analysis-charts-view.component.html',
    styleUrl: './analysis-charts-view.component.scss'

})
export class AnalysisChartsViewComponent {

    firstDisplayName: DisplayName = 'chart1';
    // lastDisplayName: DisplayName = 'chart2';
    lastDisplayName: DisplayName = 'chart3';
    buttonDisplayName: DisplayName = 'chart2';

    draggedChartName: DisplayName | null = null;

    droppedToFirst($event: DragEvent) {
        if (this.lastDisplayName === this.draggedChartName) { // got from the last panel
            this.lastDisplayName = this.firstDisplayName;
            this.firstDisplayName = this.draggedChartName;
        }
        if (this.buttonDisplayName === this.draggedChartName) { // got from the button
            this.buttonDisplayName = this.firstDisplayName;
            this.firstDisplayName = this.draggedChartName;
        }
        this.#resetDraggedChartName();
    }

    droppedToLast($event: DragEvent) {
        if (this.firstDisplayName === this.draggedChartName) { // got from the first panel
            this.firstDisplayName = this.lastDisplayName;
            this.lastDisplayName = this.draggedChartName;
        }
        if (this.buttonDisplayName === this.draggedChartName) { // got from the button
            this.buttonDisplayName = this.lastDisplayName;
            this.lastDisplayName = this.draggedChartName;
        }

        this.#resetDraggedChartName();
    }


    onChartDrag($event: DragEvent, draggedChartName: DisplayName) {
        this.draggedChartName = draggedChartName;
    }


    onDragOver($event: DragEvent) {
        $event.preventDefault();
    }

    #resetDraggedChartName(): void {
        this.draggedChartName = null;
    }
}
