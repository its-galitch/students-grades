import {inject, Injectable} from "@angular/core";
import {AnalysisGradesService, StudentGrade} from "../../analysis-grades.service";
import {ChartConfiguration, ChartData, ChartDataset} from "chart.js";
import {combineLatest, map, Observable, tap} from "rxjs";

@Injectable()
export class StudentsAvgByIdsService {

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
                text: 'Average Grades By Student Id',
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
            this.#analysisGradesService.getSelector$(),
            this.#analysisGradesService.getStudentsIds$()
        )

            .pipe(
                map(
                    ([students, selector, studentsIds]) => {
                        const { ids } = selector;

                        let displayedIds: number[];

                        if(!ids || !ids.length) {
                            displayedIds = studentsIds;
                        }else {
                            displayedIds = ids;
                        }

                        const chartData: ChartData<'bar'> = {
                            labels: displayedIds,
                            datasets: [this.#avgByIds(students)]
                        };

                        return chartData;
                    }),
            )
    }

    #avgByIds(students: StudentGrade[]): ChartDataset<'bar'> {
        const avgStudentsGrades: number[] = [];

        students.forEach((student) => {

            const grades = student.grades.map(exam => exam.grade);
            avgStudentsGrades.push(this.#averageOfNumbers(grades));
        })
        const studentAvgChartDataSet: ChartDataset<'bar'> = {
            data: avgStudentsGrades,
            label: '',
            backgroundColor: 'rgba(6,213,243,0.8)'
        }

        return studentAvgChartDataSet;

    }

    #averageOfNumbers(numbers: number[]): number {
        if (!numbers.length) return 0;
        const sum = numbers.reduce((sum, number) => sum + number, 0);
        return sum / numbers.length;
    }


}
