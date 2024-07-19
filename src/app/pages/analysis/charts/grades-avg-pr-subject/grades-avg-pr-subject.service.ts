import {inject, Injectable} from "@angular/core";
import {AnalysisGradesService, StudentGrade} from "../../analysis-grades.service";
import {ChartConfiguration, ChartData, ChartDataset} from "chart.js";
import {combineLatest, map, Observable, tap} from "rxjs";
import {selectSubjects} from "../../store/analysis-selector/analysis-selector.reducer";

@Injectable()
export class GradesAvgPrSubjectService {
    #analysisGradesService = inject(AnalysisGradesService);

    #barChartOptions: ChartConfiguration<'bar'>['options'] = {
        scales: {
            xAxes: {
                max: 100
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Average Grade By Subject'
            }
        },
        indexAxis: "y",

    };

    getBarChartOptions() {
        return this.#barChartOptions;
    }

    readonly barCharType = 'bar';

    getChartData$(): Observable<ChartData<'bar'>> {
        return combineLatest(
            this.#analysisGradesService.getFilteredStudentsGrades$(),
            this.#analysisGradesService.getSelectedSubjects$(),
            this.#analysisGradesService.getGradesSubjects$()
        )

            .pipe(
                map(
                    ([students, selectedSubjects, allGradesSubjects]) => {
                        selectedSubjects = (selectedSubjects || []);
                        let chartData: ChartData<'bar'> = {
                            labels: [],
                            datasets: [],

                        };
                        let subjects: string[];

                        if (selectedSubjects.length) {
                            subjects = selectedSubjects;
                        } else {
                            subjects = allGradesSubjects;
                        }

                        chartData.labels = subjects;
                        chartData.datasets.push(this.#avgBySubjects(students, subjects))

                        return chartData;
                    }),
            )
    }

    #avgBySubjects(students: StudentGrade[], subjects: string[]): ChartDataset<'bar'> {
        const avgData: ChartDataset<'bar'> = {
            data: [],
            backgroundColor: 'rgba(17,19,143,0.8)'
        };
        const gradesForSubjects = new Map<string, number[]>();
        subjects.forEach((subject) => {
            gradesForSubjects.set(subject, []);
        })

        students.map(student => student.grades)
            .reduce((firstGrades, nextGrades) => firstGrades.concat(nextGrades))
            .forEach(subjectExam => {
                gradesForSubjects.get(subjectExam.subject)?.push(subjectExam.grade)

            });
        const subjectsAvg: number[] = [];
        subjects.forEach((subject) => {
            const gradesArr = gradesForSubjects.get(subject) || [];
            const avg = (gradesArr.reduce((first, next) => first + next, 0)) / gradesArr.length;
            subjectsAvg.push(avg);
        })
        avgData.label = '';
        avgData.data = subjectsAvg;
        return avgData;
    }

    #averageOfNumbers(numbers: number[]): number {
        if (!numbers.length) return 0;
        const sum = numbers.reduce((sum, number) => sum + number, 0);
        return sum / numbers.length;
    }

}
