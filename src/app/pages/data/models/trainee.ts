export interface Grade {
    id: number;
    traineeId: number;
    grade: number;
    subject: string;
    date: Date;
}

export interface TraineeDetails {
    id: number;
    name: string;
    email: string;
    dateJoined: Date;
    address: string;
    city: string;
    zip?: number;
}

export interface GradeListItem {
    id: number;
    grade: number;
    subject: string;
    date: string;
    name: string;
}

export interface GradeDataItem {
    id: number;
    traineeId: number;
    grade: number;
    subject: string;
    date: Date;

    name: string;
    email: string;
    dateJoined: Date;
    address: string;
    city: string;
    zip?: number;

    isSelected: boolean;

}
