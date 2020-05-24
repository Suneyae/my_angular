import { User } from './User';
import { Exam } from './Exam';

export class Transaction{
    user:User;
    exam:Exam;
    status:string;
}