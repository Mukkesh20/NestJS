import { Injectable, NotFoundException, Inject } from '@nestjs/common';
// import { TaskStatus } from './taskStatus.enum';
import { CreateTaskDto } from './DTO/create-task.dto';
import { Task, TaskSchema } from './task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetTasksFilterDto } from './DTO/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TaskService {
  //private tasks: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    const allTasks = await this.taskModel.find();
    return allTasks;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    try {
      let tasks = await this.taskModel.find({"user._id" : user._id})

      if (status) {
        tasks = await this.taskModel
          .find({status: status,"user._id" : user._id})
          
        return tasks;
      }
      if (search) {
        tasks = await this.taskModel
          .find({
            $or: [
              { title: new RegExp(search, 'i') },
              { description: new RegExp(search, 'i') },

            ],"user._id" : user._id
          })
          .exec();
          
        return tasks;
      }
      return tasks;

    } catch (err) {
      console.log(err);
    }
  }

  async getTaskById(id: string, user: User) {
    try {
      const task = await this.taskModel.find({ _id: id, "user._id" : user._id });
      return task;
    } catch (err) {
      throw new NotFoundException(`Task with ID : "${id}" not found`);
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto, user : User): Promise<Task> {
      const {title, description} = createTaskDto;
    //const newTask = await new this.taskModel(createTaskDto, user);
    const task = await new this.taskModel();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      task.user = user;
      await task.save();
      task.user = '';
      return task
  }

  async updateTask(id: string, taskDto: CreateTaskDto, user: User) {
    try {
      const task = await this.getTaskById(id, user);
      console.log("---> " + task)
      task.title = taskDto.title;
      task.description = taskDto.description;
      task.status = taskDto.status;
      console.log("------> ")
      return task.save();
    } catch (err) {
      throw new NotFoundException(`Task with ID : "${id}" not found`);
    }
  }

  async deleteTask(id: string, user: User) {
    try {
      const taskToDelete = await this.taskModel.deleteOne({ _id: id ,"user._id" : user._id });
      return taskToDelete;
    } catch (err) {
      throw new NotFoundException(`Task with ID : "${id}" not found`);
    }
  }
}
