import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {initStudentsGrades} from "./store/students-grades/students-grades.actions";
import {studentsGrades} from "./students-grades.data";

@Injectable({providedIn: 'root'})
export class StudentsGradesLoaded implements CanActivate {
    #store = inject(Store);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.#store.dispatch(initStudentsGrades({ studentsGrades }));
        return true;
    }

}
