import {Component, inject, OnInit} from '@angular/core';
import {TraineeListService} from "../data/services/trainee-list.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    private traineesService = inject(TraineeListService);
    ngOnInit(): void {

    }
}
