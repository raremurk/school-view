import { ClassField } from "@angular/compiler";

export class Class{
    constructor(
        public id?: number,
        public name?: string,
        public classTeacherId?: number,
        public classTeacherFullName?: string) {}
}