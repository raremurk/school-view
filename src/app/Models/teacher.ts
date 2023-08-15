export class Teacher{    
    constructor(
        public id: number,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public specialization: string,
        public managementPosition: string,
        public teacherSubjects: {'id': number}[] = [],
        public teacherClasses: {'id': number}[] = [] ) {}
}