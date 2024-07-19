import {StudentGrade} from "../../../analysis/analysis-grades.service";

export function getFilteredStudents(students: StudentGrade[], ids: number[], nameFilter: string): StudentGrade[] {
    nameFilter = nameFilter.trim();
    let filteredStudents: StudentGrade[] = [];
    if (ids.length) {
        filteredStudents = students.filter(student => ids.includes(student.id));
    } else filteredStudents = students;
    if (nameFilter.length) {
        filteredStudents = filteredStudents.filter(student => student
            .name.toLocaleLowerCase()
            .includes(nameFilter.toLocaleLowerCase())
        );
    }
    return filteredStudents;
}
