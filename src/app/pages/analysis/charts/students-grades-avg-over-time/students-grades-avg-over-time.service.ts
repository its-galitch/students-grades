import {inject, Injectable} from "@angular/core";
import {AnalysisGradesService, ExamGrade} from "../../analysis-grades.service";
import {ChartConfiguration, ChartData, ChartDataset} from "chart.js";
import {map, Observable, tap} from "rxjs";
import 'chartjs-adapter-moment';

@Injectable()
export class StudentsGradeAverageOverTimeService {

    #analysisGradesService = inject(AnalysisGradesService);

    #barChartOptions: ChartConfiguration<'line'>['options'] = {
        scales: {

            xAxes: {
                type: 'time'
            },
            yAxes: {
                max: 100
            }
        },
        plugins: {
            legend: {
                display: true,

            },
            title: {
                display: true,
                text: 'Average Grades By Student Id',
            }

        },
        indexAxis: "x",

    };

    getBarChartOptions() {
        return this.#barChartOptions;
    }

    readonly barCharType = 'line';

    getChartData$(): Observable<ChartData<'line'>> {
        return this.#analysisGradesService.getFilteredStudentsGrades$()
            .pipe(
                map(
                    (students) => {
                        const chartDatasets: ChartDataset<'line'>[] = [];


                        const dates = new Set<string>();
                        students.forEach((student) =>
                        {
                            const studentDataSet : ChartDataset<'line'> = {
                                label: `${student.id}-${student.name}`,
                                data: []
                            };
                            let sum = 0;
                            student.grades
                                .slice()
                                .sort(this.#sortByGradeDate.bind(this))
                                .forEach((exam, index) => {
                                    dates.add(exam.date);
                                    sum += exam.grade;
                                    const length = index + 1;
                                    studentDataSet.data.push(sum/length);
                                });
                            chartDatasets.push(studentDataSet);
                        })


                        const chartData: ChartData<'line'> = {
                            labels: Array.from(dates).sort(),
                            datasets: chartDatasets
                        };

                        return chartData;
                    }),
            )
    }

    #sortByGradeDate(examA: ExamGrade, examB: ExamGrade) {
        const dateA = new Date(examA.date);
        const dateB = new Date(examB.date);
        return dateA.getTime() - dateB.getTime();
    }

}
