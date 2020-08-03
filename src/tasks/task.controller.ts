import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, Res, HttpStatus, NotFoundException, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './DTO/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User, UserSchema } from 'src/auth/user.entity';



@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    getTasks(@Query() filterDTO: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.taskService.getTasks(filterDTO, user);
        //return this.taskService.getAllTasks();

        
    }


    @Get('/:id')
    async getTaskById(@Param('id') id: string, @GetUser() user: User) {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createNewTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);

    }

    @Patch('/:id/update')
    updateTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto, @GetUser() user: User){
        return this.taskService.updateTask(id, createTaskDto, user)
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string, @GetUser() user: User) {
        return this.taskService.deleteTask(id, user);

    }
}
