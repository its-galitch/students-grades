import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {TraineeListService} from "./services/trainee-list.service";


@Injectable({providedIn: 'root'})
export class TraineeListLoaded implements CanActivate {
    #traineesService = inject(TraineeListService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.#traineesService.loadInitTraineesData();
        return this.#traineesService.getTraineeGradeList$()
            .pipe(map(traineeList => !!traineeList.length));
    }

}
