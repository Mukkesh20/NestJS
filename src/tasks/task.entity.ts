import * as mongoose from "mongoose";
import { TaskStatus } from "./taskStatus.enum";
import { Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User, UserSchema } from "src/auth/user.entity";

    export const TaskSchema = new mongoose.Schema({
    title: {type :String , required: true},
    description: {type :String , required: true},
    status: {type :TaskStatus , required: true},
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref : 'User'
    },
    
})


export class Task extends Document {
         _id: string;
         title: string;
         description: string;
         status: TaskStatus;
         user : User

}

