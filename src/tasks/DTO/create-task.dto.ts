import { IsNotEmpty} from 'class-validator'
import { TaskStatus } from '../taskStatus.enum';
import { Optional } from '@nestjs/common';

export class CreateTaskDto{

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @Optional()
    status: TaskStatus
}