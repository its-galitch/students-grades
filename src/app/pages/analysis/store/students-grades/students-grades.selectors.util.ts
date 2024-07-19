import {StudentGrade} from "../../analysis-grades.service";

export function filterStudentGrades(studentsGrades: StudentGrade[], ids: number[] | null): StudentGrade[] {
    let selectedStudents: StudentGrade[] = [];
    ids = (ids || []);
    if(ids.length === 0) {
        selectedStudents = structuredClone(studentsGrades);
    } else {
        for(let student of studentsGrades) {
            if(ids.includes(student.id)) {
                selectedStudents.push(student);
            }
        }
    }
    return selectedStudents;
}

export function selectedGradesSubjects(students:StudentGrade[], subjects: string[]| null): StudentGrade[] {
    subjects = (subjects || []);
    let filteredBySubjects: StudentGrade[] = [];
    if(subjects.length === 0) {
        filteredBySubjects = students;
    } else {
        students.map(student => {
            student.grades.filter(grade => subjects?.includes(grade.subject));
            return student;
        });
        filteredBySubjects = students;
    }
    return filteredBySubjects;
}

export function selectAllSubjects(studentsGrades: StudentGrade[]): string[]  {
    const grades = new Set<string>();
    studentsGrades.forEach(student => {
        student.grades.forEach(grade => grades.add(grade.subject));
    });
    return Array.from(grades);
}
