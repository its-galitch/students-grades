import {Grade, TraineeDetails} from "../../pages/data/models/trainee";

export const grades: Grade[] = [
    {
        id:1,
        date:new Date('2022-09-16'),

        subject: 'algebra',
        grade: 76,
        traineeId: 123
    },
    {
        id: 2,
        date: new Date('2022-09-26'),
        subject: 'algebra',
        grade: 71,
        traineeId: 123
    },
    {
        id: 3,
        date: new Date('2022-10-03'),
        subject: 'algebra',
        grade: 86,
        traineeId: 123
    },
    {
        id: 4,
        date: new Date('2022-10-16'),
        subject: 'algebra',
        grade: 56,
        traineeId: 123
    },
    {
        id: 5,
        date: new Date('2022-09-16'),
        subject: 'nature',
        grade: 86,
        traineeId: 123
    },
    {
        id: 6,
        date: new Date('2022-09-27'),
        subject: 'nature',
        grade: 91,
        traineeId: 123
    },
    {
        id: 7,
        date: new Date('2022-09-26'),
        subject: 'geography',
        grade: 56,
        traineeId: 123
    },
    {
        id: 8,
        date: new Date('2022-10-03'),
        subject: 'geography',
        grade: 64,
        traineeId: 123
    },
    {
        id: 9,
        date: new Date('2022-10-14'),
        subject: 'geography',
        grade: 84,
        traineeId: 123
    },
    {
        id: 10,
        date: new Date('2022-09-16'),
        subject: 'algebra',
        grade: 65,
        traineeId: 245
    },
    {
        id: 11,
        date: new Date('2022-09-26'),
        subject: 'algebra',
        grade: 89,
        traineeId: 245
    },
    {
        id: 12,
        date: new Date('2022-10-03'),
        subject: 'algebra',
        grade: 71,
        traineeId: 245
    },
    {
        id: 13,
        date: new Date('2022-10-16'),
        subject: 'algebra',
        grade: 75,
        traineeId: 245
    },
    {
        id: 14,
        date: new Date('2022-09-16'),
        subject: 'nature',
        grade: 77,
        traineeId: 245
    },
    {
        id: 15,
        date: new Date('2022-09-27'),
        subject: 'nature',
        grade: 79,
        traineeId: 245
    },
    {
        id: 16,
        date: new Date('2022-09-26'),
        subject: 'geography',
        grade: 56,
        traineeId: 245
    },
    {
        id: 17,
        date: new Date('2022-10-03'),
        subject: 'geography',
        grade: 76,
        traineeId: 123
    },
    {
        id: 18,
        date: new Date('2022-10-14'),
        subject: 'geography',
        grade: 94,
        traineeId: 245
    },
    {
        id: 20,
        date: new Date('2022-09-16'),
        subject: 'algebra',
        grade: 78,
        traineeId: 386
    },
    {
        id: 21,
        date: new Date('2022-09-26'),
        subject: 'algebra',
        grade: 91,
        traineeId: 386
    },
    {
        id: 22,
        date: new Date('2022-10-03'),
        subject: 'algebra',
        grade: 67,
        traineeId: 386
    },
    {
        id: 23,
        date: new Date('2022-10-16'),
        subject: 'algebra',
        grade: 64,
        traineeId: 386
    },
    {
        id: 24,
        date: new Date('2022-09-16'),
        subject: 'nature',
        grade: 89,
        traineeId: 386
    },
    {
        id: 25,
        date: new Date('2022-09-27'),
        subject: 'nature',
        grade: 71,
        traineeId: 386
    },
    {
        id: 26,
        date: new Date('2022-09-26'),
        subject: 'geography',
        grade: 76,
        traineeId: 386
    },
    {
        id: 27,
        date:new Date('2022-10-03'),
        subject: 'geography',
        grade: 73,
        traineeId: 386
    },
    {
        id: 28,
        date: new Date('2022-10-14'),
        subject: 'geography',
        grade: 86,
        traineeId: 386
    },
    {
        id: 29,
        date: new Date('2022-09-16'),
        subject: 'algebra',
        grade: 84,
        traineeId: 986
    },
    {
        id: 30,
        date: new Date('2022-09-26'),
        subject: 'algebra',
        grade: 76,
        traineeId: 986
    },
    {
        id: 31,
        date: new Date('2022-10-03'),
        subject: 'algebra',
        grade: 92,
        traineeId: 986
    },
    {
        id: 32,
        date: new Date('2022-10-16'),
        subject: 'algebra',
        grade: 81,
        traineeId: 986
    },
    {
        id: 33,
        date: new Date('2022-09-16'),
        subject: 'nature',
        grade: 89,
        traineeId: 986
    },
    {
        id: 34,
        date: new Date('2022-09-27'),
        subject: 'nature',
        grade: 82,
        traineeId: 986
    },
    {
        id: 35,
        date: new Date('2022-09-26'),
        subject: 'geography',
        grade: 63,
        traineeId: 986
    },
    {
        id: 36,
        date: new Date('2022-10-03'),
        subject: 'geography',
        grade: 87,
        traineeId: 986
    },
    {
        id: 37,
        date: new Date('2022-10-14'),
        subject: 'geography',
        grade: 48,
        traineeId: 986
    }
];

export const trainees: TraineeDetails[] = [
    {
        id: 123,
        name: "Moshe",
        city: "Beit Shemesh",
        address: "Nahal Hayarkon St. 18",
        dateJoined: new Date("2022-09-01"),
        email: "moshe@gmail.com"
    },
    {
        id: 245,
        name: "David",
        city: "Jerusalem",
        address: "Ehezkel St. 63",
        dateJoined: new Date("2022-09-02"),
        email: "david@gmail.com"
    },
    {
        id: 386,
        name: "Ayala",
        city: "Beit Shemesh",
        address: "Nahal Oz St. 35",
        dateJoined: new Date("2022-09-03"),
        email: "ayala@gmail.com"
    },
    {
        id: 986,
        name: "Batiya",
        city: "Jerusalem",
        address: "Giborey Israel St. 21",
        dateJoined: new Date("2022-09-02"),
        email: "batiya@gmail.com"
    }

];
