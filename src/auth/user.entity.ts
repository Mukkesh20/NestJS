import * as mongoose from "mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';
import { Task } from "../tasks/task.entity";


    export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    salt: {type: String, required: true},
    tasks: {
        type: mongoose.Schema.Types.Mixed,
        ref : 'Task'},
    
})


export class User extends Document{
    _id: string
    username: string;
    password: string;
    email: string;
    phoneNumber: string
    gender: string
    age: number
    salt : string
    
    tasks: Task[]

     async passwordValidator(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}

