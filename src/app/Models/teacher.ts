export class Teacher{
    constructor(
        public id?: number,
        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public position?: string,
        public academicSubjects?: {'id' : number}[],
        public classes?: {'id' : number}[] ) {}
}