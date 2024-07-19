import {Component} from '@angular/core';
import {DataPageService} from "../../data-page.service";

@Component({
    selector: 'app-data-page',
    templateUrl: './data-page.component.html',
    styleUrl: './data-page.component.scss',
    providers: [DataPageService]
})
export class DataPageComponent {


}
