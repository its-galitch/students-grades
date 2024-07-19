import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DataPageService} from "../../data-page.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Grade, GradeDataItem, TraineeDetails} from "../../models/trainee";
import {Subscription, tap} from "rxjs";
import {FormMode} from "./form-state.enum";

@Component({
    selector: 'app-trainee-details-form',
    templateUrl: './trainee-details-form.component.html',
    styleUrl: './trainee-details-form.component.scss'

})
export class TraineeDetailsFormComponent implements OnInit, OnDestroy {

    public FormModeValues = FormMode;

    formMode: FormMode = FormMode.Unused;

    private subscription = new Subscription();

    private dataPageService = inject(DataPageService);

    idFormControl = new FormControl<number>(0, [Validators.required]);
    gradeFormControl = new FormControl<number>(0, [Validators.required]);
    dateFormControl = new FormControl<Date | null>(null, [Validators.required]);
    subjectFormControl = new FormControl<string>('', [Validators.required]);
    traineeIdFormControl = new FormControl<number>(0, [Validators.required]);
    nameFormControl = new FormControl<string>('', [Validators.required]);
    dateJoinedFormControl = new FormControl<Date>(new Date(), [Validators.required]);
    addressFormControl = new FormControl<string>('', [Validators.required]);
    cityFormControl = new FormControl<string>('',);
    zipFormControl = new FormControl<number>(0);
    emailFormControl = new FormControl<string>('', [Validators.required]);

    private gradeFormGroup: FormGroup = new FormGroup<{ [p in keyof Grade]: FormControl<any> }>({
        id: this.idFormControl,
        grade: this.gradeFormControl,
        traineeId: this.traineeIdFormControl,
        subject: this.subjectFormControl,
        date: this.dateFormControl
    });

    private traineeFormGroup: FormGroup = new FormGroup<{ [p in keyof TraineeDetails]: FormControl<any> }>({
        id: this.traineeIdFormControl,
        name: this.nameFormControl,
        dateJoined: this.dateJoinedFormControl,
        address: this.addressFormControl,
        city: this.cityFormControl,
        zip: this.zipFormControl,
        email: this.emailFormControl
    });

    ngOnInit(): void {
        this.watchSelectedRowValues();
        this.watchFormMode();
    }

    watchSelectedRowValues() {
        const sub = this.dataPageService.getSelectedRow()
            .pipe(
                tap(selectedRow => {
                    if (!selectedRow) {
                        this.resetFormData();
                        this.dataPageService.changeFormMode(FormMode.Unused);
                    } else {
                        this.populateSelectedRowValues(selectedRow);
                        this.dataPageService.changeFormMode(FormMode.Edit);
                    }
                })
            ).subscribe();

        this.subscription.add(sub);
    }

    watchFormMode() {
        const sub = this.dataPageService.getFormMode()
            .pipe(
                tap(formMode => this.formMode = formMode),
                tap(formMode => {
                    if (formMode === FormMode.New) {
                        this.resetFormData();
                    }
                })
            )
            .subscribe();
        this.subscription.add(sub);
    }

    openNewRecordForm() {
        this.dataPageService.changeFormMode(FormMode.New);
    }

    populateSelectedRowValues(row: GradeDataItem) {
        this.idFormControl.setValue(row.id);
        this.nameFormControl.setValue(row.name);
        this.dateFormControl.setValue(row.date);
        this.traineeIdFormControl.setValue(row.traineeId);
        this.gradeFormControl.setValue(row.grade);
        this.dateJoinedFormControl.setValue(row.dateJoined);
        this.emailFormControl.setValue(row.email);
        this.addressFormControl.setValue(row.address);
        this.cityFormControl.setValue(row.city);
        this.zipFormControl.setValue(row.zip ?? null);
        this.subjectFormControl.setValue(row.subject);
    }

    onSave() {
        switch (this.formMode) {
            case FormMode.Edit:
                this.saveRecord();
                break;
            case FormMode.New:
                this.addRecord();
                this.resetFormData();
                break;
        }

    }

    saveGrade() {
        if (this.gradeFormGroup.dirty && this.gradeFormGroup.valid) {
            const gradeToSave = this.gradeFormGroup.value;
            this.dataPageService.updateGrade(gradeToSave);
        }
    }

    saveTraineeDetails() {
        if (this.traineeFormGroup.dirty && this.traineeFormGroup.valid) {
            const traineeToSave = this.traineeFormGroup.value;
            this.dataPageService.updateTrainee(traineeToSave);
        }
    }

    saveRecord() {
        this.saveGrade();
        this.saveTraineeDetails();
    }

    addTraineeDetails() {
        const {dirty, valid, value} = this.traineeFormGroup;
        if (dirty && valid) {
            this.dataPageService.addTraineeDetails(value);
        }
    }

    addGrade() {
        const {dirty, valid, value} = this.gradeFormGroup;
        if (dirty && valid) {
            this.dataPageService.addGrade(value);
        }
    }

    addRecord() {
        this.addGrade();
        this.addTraineeDetails();
    }

    resetFormData() {
        this.gradeFormGroup.reset();
        this.traineeFormGroup.reset();
    }

    deleteRecord() {
        const { id, traineeId } = this.gradeFormGroup.value;
        this.dataPageService.removeTraineeDetails(id, traineeId);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


}
