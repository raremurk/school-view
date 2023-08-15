export class Lesson{    
    constructor (       
        public id: number,  
        public day: number,  
        public index: number,  
        public classId: number,  
        public academicSubjectId: number | null,  
        public academicSubjectName: string ) {}
}