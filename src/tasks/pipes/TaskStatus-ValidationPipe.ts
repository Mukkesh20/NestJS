import { PipeTransform, ForbiddenException, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../taskStatus.enum";

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]

    transform(value: any){
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`This Status : "${value}" is not allowed`)
        }
        else {
            return value
        }
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatus.indexOf(status)
        return idx !== -1;
    }
}