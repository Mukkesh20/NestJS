import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskSchema } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports : [
        MongooseModule.forFeature([{name: 'Task', schema: TaskSchema}]),
        AuthModule],
    controllers: [TaskController],
    providers: [TaskService],
    
})
export class TasksModule {}
